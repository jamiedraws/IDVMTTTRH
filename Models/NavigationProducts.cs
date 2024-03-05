using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dtm.Framework.ClientSites.Web;

namespace IDVMTTTRH.Models
{
    public class NavigationProducts : NavigationItem
    {
        public List<NavigationItem> List;

        public NavigationProducts()
        {
            List = new List<NavigationItem>
            {
                new NavigationItem
                {
                    Id = "all",
                    Name = "All",
                    Link = FormatSearchQuery("all")
                },
                new NavigationItem
                {
                    Id = "trim",
                    Name = "Trim",
                    Link = FormatSearchQuery("trim")
                },
                new NavigationItem
                {
                    Id = "solo",
                    Name = "Solo",
                    Link = FormatSearchQuery("solo")
                }
            };

            if (!DtmContext.IsStage)
            {
                List = List.Where(x => x.IsLive).ToList();
            }

            List = List.OrderBy(x => x.Name).ToList();
        }
    }
}