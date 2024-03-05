using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IDVMTTTRH.Models
{
    public class ProductNavigationItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public bool IsLive { get; set; }

        public ProductNavigationItem ()
        {
            IsLive = true;
        }
    }
}