document.addEventListener('DOMContentLoaded', function() {
    const galeria = document.querySelector('.galeria');
    try {
        console.log('Debug: DOM loaded. conteudos isArray:', Array.isArray(conteudos));
        if (!Array.isArray(conteudos)) {
            console.error('Erro: `conteudos` não é um array ou não está definido.');
            return;
        }
        if (!galeria) {
            console.error('Erro: elemento .galeria não encontrado no DOM.');
            return;
        }

        function openMorePhotos(category) {
            // remove panel if exists
            const existing = document.getElementById('more-photos-overlay');
            if (existing) existing.remove();

            const overlay = document.createElement('section');
            overlay.className = 'more-photos';
            overlay.id = 'more-photos-overlay';

            const fotosHtml = conteudos
                .filter(c => c.categoria === category)
                .map(c => `<div class="more-photo-card"><img src="${c.imagem}" alt="${c.titulo}" /></div>`)
                .join('');

            console.log('Abrindo painel de mais fotos para categoria:', category);

            overlay.innerHTML = `
                <div class="more-photos-panel">
                    <div class="panel-header">
                        <h3>Mais fotos: ${category}</h3>
                        <a href="#" class="close-link" id="close-more">Fechar</a>
                    </div>
                    <div class="more-gallery">
                        ${fotosHtml}
                    </div>
                </div>
            `;

            // close handlers
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) overlay.remove();
            });
            document.body.appendChild(overlay);
            // tornar visível usando a classe active (evita manipular hash)
            overlay.classList.add('active');
            const closeLink = document.getElementById('close-more');
            if (closeLink) {
                closeLink.addEventListener('click', function(e){ e.preventDefault(); overlay.remove(); });
            }
        }

        conteudos.forEach(function(item) {
            const article = document.createElement('article');
            article.classList.add('gallery-card');

            const img = document.createElement('img');
            img.src = item.imagem;
            img.alt = item.titulo;

            const card = document.createElement('div');
            card.classList.add('card-content');

            const category = document.createElement('p');
            category.classList.add('card-category');
            category.textContent = item.categoria;

            const h3 = document.createElement('h3');
            h3.textContent = item.titulo;

            const desc = document.createElement('p');
            desc.textContent = item.descricao || '';

            const local = document.createElement('p');
            local.style.fontStyle = 'italic';
            local.style.fontSize = '0.9rem';
            local.textContent = item.local ? `Local: ${item.local}` : '';

            const btn = document.createElement('a');
            btn.classList.add('btn');
            btn.href = '#';
            btn.textContent = 'Ver mais';
            btn.dataset.category = item.categoria;
            btn.addEventListener('click', function(e){
                e.preventDefault();
                console.log('Botão Ver mais clicado para categoria:', item.categoria);
                openMorePhotos(item.categoria);
            });

            card.appendChild(category);
            card.appendChild(h3);
            card.appendChild(desc);
            card.appendChild(local);
            card.appendChild(btn);

            article.appendChild(img);
            article.appendChild(card);

            galeria.appendChild(article);
        });
    } catch (err) {
        console.error('Erro ao gerar a galeria:', err);
    }
});