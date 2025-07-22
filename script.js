document.addEventListener('DOMContentLoaded', () => {

    const rijksbegroting2025_gedetailleerd = {
        totaalUitgaven: 433.6e9,
        categorieen: [
            {
                naam: "Zorg", bedrag: 110.8e9,
                subcategorieen: [
                    { naam: "Curatieve Zorg (ziekenhuis, huisarts)", bedrag: 65e9 },
                    { naam: "Langdurige Zorg (ouderen, gehandicapten)", bedrag: 35e9 },
                    { naam: "Jeugdzorg", bedrag: 6e9 },
                    { naam: "Volksgezondheid & Preventie", bedrag: 4.8e9 }
                ]
            },
            {
                naam: "Sociale Zekerheid", bedrag: 107.4e9,
                subcategorieen: [
                    { naam: "Ouderdom (AOW)", bedrag: 54e9 },
                    { naam: "Kindregelingen", bedrag: 17e9 },
                    { naam: "Ziekte & Handicap (WIA, Wajong)", bedrag: 15e9 },
                    { naam: "Bijstand & Participatie", bedrag: 12e9 },
                    { naam: "Werkloosheid (WW)", bedrag: 9.4e9 }
                ]
            },
            {
                naam: "Onderwijs, Cultuur & Wetenschap", bedrag: 53.7e9,
                subcategorieen: [
                    { naam: "Primair & Voortgezet Onderwijs", bedrag: 26e9 },
                    { naam: "Hoger Onderwijs & Wetenschap", bedrag: 15e9 },
                    { naam: "Middelbaar Beroepsonderwijs (MBO)", bedrag: 8e9 },
                    { naam: "Cultuur & Media", bedrag: 4.7e9 }
                ]
            },
            {
                naam: "Gemeente- & Provinciefonds", bedrag: 41.3e9,
                subcategorieen: [
                    { naam: "Algemene uitkering aan gemeenten", bedrag: 38.3e9 },
                    { naam: "Algemene uitkering aan provincies", bedrag: 3e9 }
                ]
            },
            {
                naam: "Economische Zaken & Klimaat", bedrag: 26.3e9,
                subcategorieen: [
                    { naam: "Klimaat (o.a. SDE++)", bedrag: 12.5e9 },
                    { naam: "Nationaal Groeifonds", bedrag: 6.8e9 },
                    { naam: "Ondersteuning bedrijven (o.a. MKB)", bedrag: 4.1e9 },
                    { naam: "Onderzoek en Innovatie", bedrag: 2.9e9 }
                ]
            },
            {
                naam: "Defensie", bedrag: 21.4e9,
                subcategorieen: [
                    { naam: "Investeringen in materieel", bedrag: 8.5e9 },
                    { naam: "Personeelskosten", bedrag: 7.9e9 },
                    { naam: "Overige operationele kosten", bedrag: 5e9 }
                ]
            },
            {
                naam: "Veiligheid & Rechtspraak", bedrag: 21.3e9,
                subcategorieen: [
                    { naam: "Politie", bedrag: 10.2e9 },
                    { naam: "Rechtspraak", bedrag: 3.5e9 },
                    { naam: "Gevangeniswezen (DJI)", bedrag: 3.1e9 },
                    { naam: "Brandweer & Crisisbeheersing", bedrag: 2.5e9 },
                    { naam: "Openbaar Ministerie (OM)", bedrag: 2e9 }
                ]
            },
            {
                naam: "Infrastructuur & Waterstaat", bedrag: 15.2e9,
                subcategorieen: [
                    { naam: "Wegen en Verkeersveiligheid", bedrag: 7.1e9 },
                    { naam: "Spoorwegen (ProRail)", bedrag: 4.6e9 },
                    { naam: "Waterveiligheid (dijken, waterkwaliteit)", bedrag: 3.5e9 }
                ]
            },
            { naam: "Rente op Staatsschuld", bedrag: 11.5e9, subcategorieen: null },
            {
                naam: "Asiel & Migratie", bedrag: 4.8e9,
                subcategorieen: [
                    { naam: "Opvang asielzoekers (COA)", bedrag: 3.2e9 },
                    { naam: "Immigratie- en Naturalisatiedienst (IND)", bedrag: 1.1e9 },
                    { naam: "Terugkeerbeleid", bedrag: 0.5e9 }
                ]
            },
            {
                naam: "Buitenlandse Zaken & Handel", bedrag: 4.6e9,
                subcategorieen: [
                    { naam: "Ontwikkelingssamenwerking", bedrag: 2.5e9 },
                    { naam: "Ambassades en Consulaten", bedrag: 1.2e9 },
                    { naam: "Internationale missies & lidmaatschappen", bedrag: 0.9e9 }
                ]
            },
            { naam: "Overig", bedrag: 15.3e9, subcategorieen: null }
        ]
    };

    const calculateBtn = document.getElementById('calculate-btn');
    const taxInput = document.getElementById('tax-input');
    const resultsSection = document.getElementById('results-section');
    const errorMessage = document.getElementById('error-message');

    calculateBtn.addEventListener('click', () => {
        const taxAmount = parseFloat(taxInput.value);

        if (isNaN(taxAmount) || taxAmount < 0) {
            errorMessage.textContent = 'Vul a.u.b. een geldig, positief bedrag in.';
            return;
        }
        errorMessage.textContent = '';

        displayResults(taxAmount);
    });

    function displayResults(taxAmount) {
        let html = `<h2>Jouw bonnetje</h2>`;
        
        // Sorteer de categorieën van hoog naar laag bedrag voor weergave
        const sortedCategories = [...rijksbegroting2025_gedetailleerd.categorieen].sort((a,b) => b.bedrag - a.bedrag);

        sortedCategories.forEach(cat => {
            const userShare = taxAmount * (cat.bedrag / rijksbegroting2025_gedetailleerd.totaalUitgaven);
            const hasSubcategories = cat.subcategorieen && cat.subcategorieen.length > 0;

            html += `
                <div class="category-item">
                    <div class="category-header ${hasSubcategories ? 'expandable' : ''}">
                        <span class="category-name">${cat.naam}</span>
                        <div class="header-right">
                            <span class="category-amount">€ ${userShare.toFixed(2)}</span>
                            ${hasSubcategories ? '<span class="category-toggle">+</span>' : '<span class="category-toggle-placeholder"></span>'}
                        </div>
                    </div>`;

            if (hasSubcategories) {
                html += `<div class="subcategory-list">`;
                cat.subcategorieen.forEach(subcat => {
                    // Gebruik hier de verhouding van de subcategorie tot de hoofdcategorie voor de berekening
                    const subcatShare = userShare * (subcat.bedrag / cat.bedrag);
                    html += `
                        <div class="subcategory-item">
                            <span class="subcategory-name">${subcat.naam}</span>
                            <span class="subcategory-amount">€ ${subcatShare.toFixed(2)}</span>
                        </div>
                    `;
                });
                html += `</div>`;
            }
            
            html += `</div>`;
        });

        resultsSection.innerHTML = html;
        resultsSection.classList.add('visible');
        addAccordionListeners();
        // Scroll naar de resultaten voor een betere gebruikerservaring
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    function addAccordionListeners() {
        document.querySelectorAll('.category-header.expandable').forEach(header => {
            header.addEventListener('click', () => {
                header.parentElement.classList.toggle('is-open');
            });
        });
    }
});