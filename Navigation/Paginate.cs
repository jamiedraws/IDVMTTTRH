using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IDVMTTTRH.Navigation
{
    public class Paginate
    {
        public readonly int TakeCount;
        public Paginate(int takeCount)
        {
            TakeCount = takeCount;
        }

        /// <summary>
        /// Determines the skip count based on the "page" query string parameter. Defaults to 0 given whether the parameter is invalid or less than 0.
        /// </summary>
        /// <returns></returns>
        public int GetSkipCountByPageParameter(string pageParameter)
        {
            int pageNumber;

            int.TryParse(pageParameter, out pageNumber);

            return pageNumber <= 0 ? 0 : (pageNumber - 1) * TakeCount;
        }

        /// <summary>
        /// Takes a list and determines the amount of pages left
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <returns></returns>
        public int GetNumberOfPagesByList<T>(List<T> list)
        {
            double pages = ((double)list.Count()) / TakeCount;
            pages = Math.Ceiling(pages);

            return Convert.ToInt32(pages);
        }
    }
}