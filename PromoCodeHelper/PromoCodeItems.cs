using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IDVMTTTRH.PromoCodeHelper
{
    public static class PromoCodeItems
    {
        public static List<string> OneTimeOnlyPromoCodes = new List<string>();

        public static PromoCodeProductIndexer AllowedItems = new PromoCodeProductIndexer();

        public static PromoCodeProductIndexer ExcludedItems = new PromoCodeProductIndexer();
    }
}