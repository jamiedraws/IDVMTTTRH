using System.Collections.Generic;
using System.Linq;
using Dtm.Framework.ClientSites.Web;
using System.IO;
using System.Web;
using System.Drawing;
using System;
using System.Drawing.Imaging;
using System.Text;

namespace IDVMTTTRH.Utils
{
    public class ImageEngine
    {
        public readonly List<string> Images;
        public readonly List<string> FallbackImages;
        public readonly List<string> NextGenImages;

        public readonly string ImageDirectory;
        private readonly string _directoryPath;

        public ImageEngine(string directoryName, string directoryPath = null)
        {
            ImageDirectory = directoryPath ?? "images/" + directoryName;

            _directoryPath = Path.Combine(DtmContext.ProjectPath, ImageDirectory);

            Images = GetImages();
            NextGenImages = GetNextGenImages();
            FallbackImages = GetFallbackImages();
        }

        public Bitmap GetBitmapByFileName(string fileName)
        {
            try
            {
                return new Bitmap(string.Format("{0}/{1}", _directoryPath, fileName));
            }
            catch (Exception ex)
            {
                return new Bitmap(1, 1);
            }
        }

        public List<string> FormatRelativeImagePaths(List<string> images)
        {
            return images.Select(i => FormatRelativeImagePath(i)).ToList();
        }

        public string FormatRelativeImagePath(string fileName)
        {
            return string.Format("/{0}/{1}", ImageDirectory, fileName ?? string.Empty);
        }

        public string GetImageFileName(string fileName)
        {
            return Path.GetFileNameWithoutExtension(fileName) ?? string.Empty;
        }

        public string GetImageFileNameWithExtension(string fileName)
        {
            return Path.GetFileName(fileName) ?? string.Empty;
        }

        public List<string> GetNextGenImages(List<string> images = null)
        {
            return (images ?? Images).Where(i => i.EndsWith(".webp")).ToList();
        }

        public List<string> GetFallbackImages(List<string> images = null)
        {
            List<string> candidates = images ?? Images;

            return candidates.Except(GetNextGenImages(candidates)).ToList();
        }

        public List<string> GetImages()
        {
            return Directory.Exists(_directoryPath)
                ? new DirectoryInfo(_directoryPath)
                    .GetFiles("*")
                    .OrderBy(i => i.Name)
                    .Select(i => i.Name).ToList()
                : new List<string>();
        }

        public List<string> GetImagesByNamePattern(string namePattern)
        {
            return Images.Where(i => i.Contains(namePattern)).ToList();
        }

        public List<string> GetImagesExceptNamePattern(string namePattern)
        {
            return Images.Where(i => !i.Contains(namePattern)).ToList();
        }

        public string GetMimeTypeByFileName(string fileName)
        {
            return MimeMapping.GetMimeMapping(fileName);
        }

        public string GetFirstImage(List<string> images = null)
        {
            List<string> candidates = images ?? Images;

            return candidates.FirstOrDefault(i => candidates.IndexOf(i) == 0);
        }

        public string GetFirstFallbackImage(List<string> fallbackImages = null)
        {
            List<string> candidates = fallbackImages ?? FallbackImages;

            return candidates.FirstOrDefault(i => candidates.IndexOf(i) == 0);
        }

        public string GetFirstNextGenImage(List<string> nextGenImages = null)
        {
            List<string> candidates = nextGenImages ?? NextGenImages;

            return candidates.FirstOrDefault(i => candidates.IndexOf(i) == 0);
        }

        public List<string> GetNextGenImagesFromImagesByFileName(string fileName, List<string> nextGenImages = null)
        {
            List<string> candidates = nextGenImages ?? NextGenImages;

            var files = candidates.Select(i => new { Name = GetImageFileName(i), Extension = Path.GetExtension(i) });

            return files.Where(f => f.Name.Equals(fileName)).Select(f => f.Name + f.Extension).ToList();
        }

        public string GetImagePath(string image)
        {
            return !string.IsNullOrEmpty(image)
                ? FormatRelativeImagePath(image)
                : string.Empty;
        }

        public string GetFirstImagePath()
        {
            var image = GetFirstImage();

            return image != null
                ? FormatRelativeImagePath(image)
                : string.Empty;
        }

        public string SetFirstImageOrDefault(string defaultImage)
        {
            return !string.IsNullOrEmpty(GetFirstImagePath())
                ? GetFirstImagePath()
                : defaultImage ?? string.Empty;
        }

        public string BuildHTMLPictureElementsFromImages(string HTMLElement = null)
        {
            return BuildHTMLPictureElements(FallbackImages, HTMLElement);
        }

        public string GetImageMetaDescriptionByFile(string file)
        {
            return GetImageMetaDescriptionByBitmap(GetBitmapByFileName(file));
        }

        private string GetImageMetaDescriptionByBitmap(Bitmap bitmap)
        {
            PropertyItem[] properties = bitmap.PropertyItems;

            PropertyItem property = properties.FirstOrDefault(p => p.Id.Equals(0x010E));

            string description = "";

            if (property != null)
            {
                description = Encoding.UTF8.GetString(property.Value).TrimEnd('\n', '\0');
            }

            return description;
        }

        public string BuildHTMLPictureElement(string file, bool lazyLoad = false)
        {
            string HTMLSourceElement = string.Empty;

            var nextGenImages = GetNextGenImagesFromImagesByFileName(GetImageFileName(file)).Select(i => new {
                ImagePath = FormatRelativeImagePath(i),
                MimeType = GetMimeTypeByFileName(i)
            }).ToList();

            if (nextGenImages.Count() > 0)
            {
                nextGenImages.ForEach(nextGenImage =>
                {
                    HTMLSourceElement += string.Format(@"<source srcset=""{0}"" type=""{1}"">", nextGenImage.ImagePath, nextGenImage.MimeType);
                });
            }
            
            string description = string.Empty;
            string width = string.Empty;
            string height = string.Empty;

            if (file.Contains(".jpg"))
            {
                Bitmap bitmap = GetBitmapByFileName(file);

                description = GetImageMetaDescriptionByBitmap(bitmap);
                width = bitmap.Width.ToString();
                height = bitmap.Height.ToString();
            }

            string imageSource = FormatRelativeImagePath(file);

            string imageAttributeList = string.Format(@"src=""{0}"" alt=""{1}"" width=""{2}"" height=""{3}""", imageSource, description, width, height);

            if (lazyLoad)
            {
                imageAttributeList = string.Format(@"{0} loading=""lazy""", imageAttributeList);

            }
            return string.Format(@"<picture>{0}<img {1}></picture>", HTMLSourceElement, imageAttributeList);
        }

        private string BuildHTMLPictureElements(List<string> images, string HTMLElement = null)
        {
            string HTMLContainer = HTMLElement ?? "{{HTMLPictureElement}}";

            string HTMLPictureElements = string.Empty;

            images.ForEach(image =>
            {
                bool isOffscreenImage = images.First() != image;

                string HTMLPictureElement = BuildHTMLPictureElement(image, isOffscreenImage);

                HTMLPictureElements += HTMLContainer.Replace("{{HTMLPictureElement}}", HTMLPictureElement);
            });

            return HTMLPictureElements;
        }
    }
}