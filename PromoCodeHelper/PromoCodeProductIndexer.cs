using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IDVMTTTRH.PromoCodeHelper
{
    public class PromoCodeProductIndexer
    {
        private readonly Dictionary<string, List<string>> _promoCodeProducts = new Dictionary<string, List<string>>();

        public void AddPromoCodeProducts(string promoCode, List<string> productSkus)
        {

            if (string.IsNullOrWhiteSpace(promoCode) || productSkus == null || !productSkus.Any())
                return;

            if (_promoCodeProducts.ContainsKey(promoCode))
            {
                _promoCodeProducts[promoCode] = productSkus;
            }
            else
            {
                _promoCodeProducts.Add(promoCode, productSkus);
            }
        }

        public List<string> this[string promoCode]
        {
            get
            {
                if (string.IsNullOrWhiteSpace(promoCode))
                {
                    return new List<string>();
                }else if(_promoCodeProducts.ContainsKey(promoCode))
                {
                    return _promoCodeProducts[promoCode];
                }

                return new List<string>();
            }
        }

    }
}