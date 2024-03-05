using Dtm.Framework.ClientSites;
using Dtm.Framework.ClientSites.Web;
using Dtm.Framework.Models;
using Dtm.Framework.Services.DtmApi;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace IDVMTTTRH.PromoCodeHelper
{
    public class PromoCodeManager
    {
        private readonly DtmApiClient _client = new DtmApiClient();
        private readonly string apiUrl = SettingsManager.ContextSettings["Dtm.Api.Url"];
        public int GetPromoAppliedAmount(string promoCode)
        {
            return MakeSequenceNumberRequest("GetNumber", promoCode);
        }

        public void IncrementPromoAppliedAmount(string promoCode)
        {
            MakeSequenceNumberRequest("IncrementNumber", promoCode);
        }
        private int MakeSequenceNumberRequest(string action, string promoCode)
        {
            int sequenceNumberValue = 0;
            var endpoint = string.Format("{0}workers.dtm/?worker={1}&action={2}", apiUrl, "SequenceNumberManager", action);
            try
            {
                var response = _client.PostData(endpoint, new { SequenceNumberCode = promoCode });
                if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
                    return 0;

                int.TryParse(response.Content, out sequenceNumberValue);
                
            }
            catch(Exception ex)
            {
                SiteExceptionHandler.HandleException(ex);
            }
            return sequenceNumberValue;
        }
        public bool IsDuplicateHouseholdOrder(out List<string> modelErrors, string productCode, string email)
        {
            modelErrors = new List<string>();
            var isDuplicate = false;
            var endpoint = string.Format("{0}workers.dtm/?worker={1}&action={2}", apiUrl, "HouseholdOrder", "GetHouseholdOrderCounts");
            try
            {
                var emailCount = 0;
                var obj = new
                {
                    CampaignCode = DtmContext.CampaignCode,
                    Email = email,
                    CampaignProductId = DtmContext.ShoppingCart[productCode].CampaignProduct.CampaignProductId.ToString()
                };

                var response = _client.PostData(endpoint, obj).Content;

                var serializer = new JavaScriptSerializer();
                dynamic result = serializer.DeserializeObject(response);
                emailCount = result["EmailCount"]; 

                if (emailCount >= 1)
                {
                    isDuplicate = true;
                    modelErrors.Add("Promo Code removed, only allowed for one time use per Email.");
                }

            }
            catch (Exception ex)
            {
                SiteExceptionHandler.HandleException(ex);
            }
            return isDuplicate;
        }
        public void AddHouseholdOrder(int orderId)
        {
            var endpoint = string.Format("{0}workers.dtm/?worker={1}&action={2}", apiUrl, "HouseholdOrder", "AddHouseholdOrder");
            try
            {
               _client.PostData(endpoint, new { OrderId = orderId });

            }
            catch (Exception ex)
            {
                SiteExceptionHandler.HandleException(ex);
            }
        }

    }
}