var currentPage = 0;

const pages = [
    'publication.html',
    'publication-1.html',
    'publication-2.html',
    'publication-3.html',
    'publication-4.html',
    'publication-5.html',
    'publication-6.html',
    'publication-7.html',
    'publication-8.html',
    'publication-9.html',
    'publication-10.html',
    'publication-11.html',
    'publication-12.html',
    'publication-13.html',
    'publication-14.html',
    'publication-15.html',
    'publication-16.html',
    'publication-17.html',
    'publication-18.html',
    'publication-19.html',
    'publication-20.html',
    'publication-21.html',
    'publication-22.html',
    'publication-23.html'
];

function fitPublicationInsideIframe() {
    const iframe = document.getElementById('contentIFrame');
    if (!iframe || !iframe.contentDocument) return;

    const doc = iframe.contentDocument;
    const body = doc.body;
    if (!body) return;

    const style = body.getAttribute('style') || '';
    const originalWidth = parseFloat(style.match(/width:\s*([0-9.]+)px/)?.[1]) || 842;
    const originalHeight = parseFloat(style.match(/height:\s*([0-9.]+)px/)?.[1]) || 595;

    let wrapper = doc.getElementById('fitWrapper');

    if (!wrapper) {
        wrapper = doc.createElement('div');
        wrapper.id = 'fitWrapper';

        while (body.firstChild) {
            wrapper.appendChild(body.firstChild);
        }

        body.appendChild(wrapper);
    }

    const scale = Math.min(
        window.innerWidth / originalWidth,
        window.innerHeight / originalHeight
    );

    const left = (window.innerWidth - originalWidth * scale) / 2;
    const top = (window.innerHeight - originalHeight * scale) / 2;

    doc.documentElement.style.margin = '0';
    doc.documentElement.style.padding = '0';
    doc.documentElement.style.width = '100vw';
    doc.documentElement.style.height = '100vh';
    doc.documentElement.style.overflow = 'hidden';

    body.style.margin = '0';
    body.style.padding = '0';
    body.style.width = '100vw';
    body.style.height = '100vh';
    body.style.overflow = 'hidden';
    body.style.background = '#2f3136';
	doc.documentElement.style.background = '#2f3136';

    wrapper.style.position = 'absolute';
    wrapper.style.left = left + 'px';
    wrapper.style.top = top + 'px';
    wrapper.style.width = originalWidth + 'px';
    wrapper.style.height = originalHeight + 'px';
    wrapper.style.transformOrigin = '0 0';
    wrapper.style.transform = `scale(${scale})`;
	wrapper.style.boxShadow = '0 10px 60px rgba(0,0,0,.45)';
}

function goToPage(index) {
    if (index < 0 || index >= pages.length) return;

    currentPage = index;

    const iframe = document.getElementById('contentIFrame');
    iframe.style.opacity = '0';
	iframe.src = 'publication-web-resources/html/' + pages[currentPage];

    showHideArrows();
}

function showPreviousPage() {
    goToPage(currentPage - 1);
}

function showNextPage() {
    goToPage(currentPage + 1);
}

function showHideArrows() {
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    if (prev) {
        prev.style.visibility = currentPage === 0 ? 'hidden' : 'visible';
    }

    if (next) {
        next.style.visibility = currentPage === pages.length - 1 ? 'hidden' : 'visible';
    }
}

window.addEventListener('load', function () {
    const iframe = document.getElementById('contentIFrame');
    if (!iframe) return;

    iframe.addEventListener('load', function () {
        fitPublicationInsideIframe();

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                iframe.style.opacity = '1';
            });
        });
    });

    fitPublicationInsideIframe();
    showHideArrows();

    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            iframe.style.opacity = '1';
        });
    });
});

window.addEventListener('resize', fitPublicationInsideIframe);