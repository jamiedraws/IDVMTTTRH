using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dtm.Framework.ClientSites.Web;

namespace IDVMTTTRH.Models
{
    public class NavigationList
    {
        public List<NavigationItem> Entries;

        public NavigationList ()
        {
            Entries = new List<NavigationItem>();
        }

        public void AddItem (NavigationItem item)
        {
            Entries.Add(SetPage(item));
        }

        public NavigationItem GetItemById (string id)
        {
            var entry = Entries.Where(i => i.Id == id);

            return entry.Any() ? entry.FirstOrDefault() : new NavigationItem();
        }

        public List<NavigationItem> GetItemsByIdRange (List<string> idRange)
        {
            var entries = new List<NavigationItem>();
            
            foreach (var id in idRange)
            {
                entries.Add(GetItemById(id));
            }

            return entries;
        }

        public bool IsOnSamePage (string page)
        {
            return string.Equals(page, DtmContext.Page.PageAlias, StringComparison.InvariantCultureIgnoreCase) || string.Equals(page, DtmContext.Page.PageCode, StringComparison.InvariantCultureIgnoreCase);
        }

        private string CreateQueryString (SortedList<string, string> parameters)
        {
            var query = "?";
            var length = parameters.Count();

            foreach (var parameter in parameters)
            {
                var index = parameters.IndexOfKey(parameter.Key);

                query += string.Format("{0}{1}={2}", 
                    index > 0 && index < length ? "&" : string.Empty, 
                    parameter.Key, 
                    parameter.Value);
            }

            return query;
        }

        public NavigationItem SetPage (NavigationItem item)
        {
            if (string.IsNullOrEmpty(item.Page) 
                && !string.IsNullOrEmpty(item.Hash))
            {
                item.Page = item.Hash;
            } 
            else if (item.QueryParameters.Any()) 
            {
                item.Page = string.Format("/{0}/{1}/{2}{3}{4}",
                    DtmContext.OfferCode,
                    DtmContext.Version,
                    item.Page,
                    DtmContext.ApplicationExtension,
                    CreateQueryString(item.QueryParameters)
                );
            }
            else
            {
                item.Page = IsOnSamePage(item.Page) 
                    ? item.Hash 
                    : string.Format("/{0}/{1}/{2}{3}{4}", 
                        DtmContext.OfferCode,
                        DtmContext.Version,
                        item.Page, 
                        DtmContext.ApplicationExtension, 
                        item.ApplyHash ? item.Hash : string.Empty);
            }

            return item;
        }
    }
}