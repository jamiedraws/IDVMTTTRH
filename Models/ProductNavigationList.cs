using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dtm.Framework.ClientSites.Web;

namespace IDVMTTTRH.Models
{
    public class ProductNavigationList
    {
        protected string _searchQuery;

        private List<ProductNavigationItem> _list;

        public List<ProductNavigationItem> ItemList
        {
            get
            {
                return _list;
            }
            set
            {
                _list = ApplyLiveFilter(value);
                _list = Organize(value);
            }
        }

        public ProductNavigationList()
        {
            _searchQuery = "SearchResults?n=1&query={0}";
        }

        public string FormatSearchQuery(string url)
        {
            return string.Format("/{0}/{1}/{2}", 
                DtmContext.OfferCode, 
                DtmContext.Version, 
                string.Format(_searchQuery, url.Replace(" ", "%20"))
            );
        }

        public List<ProductNavigationItem> Organize (List<ProductNavigationItem> list)
        {
            return list.OrderBy(x => x.Name).ToList();
        }

        public List<ProductNavigationItem> ApplyLiveFilter(List<ProductNavigationItem> list)
        {
            if (!DtmContext.IsStage)
            {
                list = list.Where(x => x.IsLive).ToList();
            }

            return list;
        }

        public List<ProductNavigationItem> GetItemsByIdRange(List<string> idRange)
        {
            var entries = new List<ProductNavigationItem>();

            foreach (var id in idRange)
            {
                var items = ItemList.Where(i => i.Id == id);

                if (items.Any())
                {
                    entries.Add(items.FirstOrDefault());
                }
            }

            return entries;
        }
    }
}