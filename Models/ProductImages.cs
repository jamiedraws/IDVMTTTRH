using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dtm.Framework.ClientSites.Web;
using System.IO;

namespace IDVMTTTRH.Models
{
    public class ProductImages
    {
        
        public readonly string ImageDirectory;
        private readonly string _directoryPath;

        public ProductImages(string productCode, string directoryPath = null)
        {
            ImageDirectory = directoryPath ?? "images/products/" + productCode;
            _directoryPath = Path.Combine(DtmContext.ProjectPath, ImageDirectory);
        }

        private string FormatRelativeImagePath (string fileName)
        {
            return string.Format("/{0}/{1}", ImageDirectory, fileName);
        }

        public string GetImageFileName(string fileName)
        {
            return Path.GetFileNameWithoutExtension(fileName) ?? string.Empty;
        }

        public List<string> GetImages()
        {
            var directoryPath = _directoryPath;
            var directoryImages = Directory.Exists(directoryPath)
                ? new DirectoryInfo(directoryPath)
                    .GetFiles("*")
                    .Where(i => !i.Name.Contains("thumbnail"))
                    .OrderBy(i => i.Name)
                    .Select(i => i.Name).ToList()
                : new List<string>();
            
            return directoryImages;
        }

        private List<string> GetThumbnails ()
        {
            var directoryPath = _directoryPath;
            var directoryImages = Directory.Exists(directoryPath)
                ? new DirectoryInfo(directoryPath)
                    .GetFiles("*thumbnail.jpg")
                    .Select(i => i.Name).ToList()
                : new List<string>();
            
            return directoryImages;
        }

        public string GetFirstImage ()
        {
            var images = GetImages();
            var image = images.FirstOrDefault(i => images.IndexOf(i) == 0);

            return image;
        }

        private string GetFirstThumbnail ()
        {
            var images = GetThumbnails();
            var image = images.FirstOrDefault(i => images.IndexOf(i) == 0);

            return image;
        }

        public string GetImagePath(string image)
        {
            return !string.IsNullOrEmpty(image)
                ? FormatRelativeImagePath(image)
                : string.Empty;
        }

        public string GetFirstImagePath ()
        {
            var image = GetFirstImage();

            return image != null 
                ? FormatRelativeImagePath(image) 
                : string.Empty;
        }

        public string GetFirstThumbnailPath ()
        {
            var image = GetFirstThumbnail();

            return image != null 
                ? FormatRelativeImagePath(image) 
                : string.Empty;
        }

        public string SetFirstImageOrDefault (string defaultImage)
        {
            return !string.IsNullOrEmpty(GetFirstImagePath()) 
                ? GetFirstImagePath() 
                : defaultImage ?? string.Empty;
        }
    }
}