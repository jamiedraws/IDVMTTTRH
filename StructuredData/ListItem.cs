using System;

namespace IDVMTTTRH.StructuredData
{
    /// <summary>
    /// An list item, e.g. a step in a checklist or how-to description.
    /// https://schema.org/ListItem
    /// </summary>
    public class ListItem
    {
        /// <summary>
        /// The name of the item.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// An entity represented by an entry in a list or data feed (e.g. an 'artist' in a list of 'artists')’.
        /// </summary>
        public string Item { get; set; }

        public ListItem()
        {
            Name = String.Empty;
            Item = String.Empty;
        }
    }
}