export default function gumletLoader({ src, width, quality }) {
  if (src.includes('cf.kapil.app')) {
    let parsedUrl = new URL(src);
    parsedUrl.hostname = 'kapil.gumlet.io';
    parsedUrl.searchParams.set('w', width);
    parsedUrl.searchParams.set('q', quality || 80);
    return parsedUrl.toString();
  } else {
    return `${src}?w=${width}&q=${quality || 80}`;
  }
}
