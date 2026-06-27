export function preloadImages(urls) {
  const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));

  return Promise.all(
    uniqueUrls.map(
      (url) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = () => resolve(url);
          img.src = url;
        })
    )
  );
}
