namespace IDVMTTTRH.StructuredData
{
    /// <summary>
    /// Any offered product or service. For example: a pair of shoes; a concert ticket; the rental of a car; a haircut; or an episode of a TV show streamed online.
    /// https://schema.org/Product
    /// </summary>
    public class Product
    {
        /// <summary>
        /// The product page URL.
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// The name of the item.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// An image of the item. This can be a URL or a fully described ImageObject.
        /// </summary>
        public string Image { get; set; }
        /// <summary>
        /// A description of the item.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// The Stock Keeping Unit (SKU), i.e. a merchant-specific identifier for a product or service, or the product to which the offer refers.
        /// </summary>
        public string Sku { get; set; }
        /// <summary>
        /// The brand(s) associated with a product or service, or the brand(s) maintained by an organization or business person.
        /// </summary>
        public string Brand { get; set; }

        public Product()
        {
            Id = string.Empty;
            Name = string.Empty;
            Image = string.Empty;
            Description = string.Empty;
            Sku = string.Empty;
            Brand = string.Empty;
        }
    }
}