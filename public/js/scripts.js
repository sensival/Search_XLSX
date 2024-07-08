/*!
* Start Bootstrap - Bare v5.0.9 (https://startbootstrap.com/template/bare)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
/*
document.getElementById('fileInput').addEventListener('change', handleFile, false);

function handleFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // 첫 번째 시트의 데이터를 읽어옵니다.
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // 표로 데이터를 출력합니다.
        displayTable(json);
    };
    
    reader.readAsArrayBuffer(file);
}

function displayTable(data) {
    const table = document.getElementById('outputTable');
    table.innerHTML = '';

    // 테이블 헤더 생성
    const thead = document.createElement('thead');
    thead.classList.add('ko_font'); 
    const headerRow = document.createElement('tr');
    data[0].forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 테이블 본문 생성
    const tbody = document.createElement('tbody');
    tbody.classList.add('table_font'); 
    for (let i = 1; i < data.length; i++) {
        const row = document.createElement('tr');
        data[i].forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            row.appendChild(td);
        });
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
}*/

document.getElementById('fileInput').addEventListener('change', handleFile, false);

        function handleFile(e) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // 탭 컨테이너와 컨텐츠 초기화
                const tabsContainer = document.getElementById('tabsContainer');
                const tabsContent = document.getElementById('tabsContent');
                tabsContainer.innerHTML = '';
                tabsContent.innerHTML = '';

                // 각 시트에 대해 탭과 테이블 생성
                workbook.SheetNames.forEach((sheetName, index) => {
                    const worksheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    // 탭 생성
                    const tabId = `tab${index}`;
                    const tab = document.createElement('li');
                    tab.classList.add('nav-item');
                    const tabLink = document.createElement('a');
                    tabLink.classList.add('nav-link');
                    if (index === 0) tabLink.classList.add('active');
                    tabLink.id = `${tabId}-tab`;
                    tabLink.setAttribute('data-toggle', 'tab');
                    tabLink.href = `#${tabId}`;
                    tabLink.role = 'tab';
                    tabLink.setAttribute('aria-controls', tabId);
                    tabLink.setAttribute('aria-selected', index === 0);
                    tabLink.textContent = sheetName;
                    tab.appendChild(tabLink);
                    tabsContainer.appendChild(tab);

                    // 테이블 생성
                    const table = document.createElement('table');
                    table.classList.add('table', 'table-bordered', 'mt-3');
                    displayTable(json, table);

                    // 탭 컨텐츠 생성
                    const tabContent = document.createElement('div');
                    tabContent.classList.add('tab-pane', 'fade');
                    if (index === 0) tabContent.classList.add('show', 'active');
                    tabContent.id = tabId;
                    tabContent.role = 'tabpanel';
                    tabContent.setAttribute('aria-labelledby', `${tabId}-tab`);
                    tabContent.appendChild(table);
                    tabsContent.appendChild(tabContent);
                });
            };
            
            reader.readAsArrayBuffer(file);
        }

        function displayTable(data, table) {
            table.innerHTML = '';

            // 테이블 헤더 생성
            const thead = document.createElement('thead');
            thead.classList.add('ko_font');
            const headerRow = document.createElement('tr');
            data[0].forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // 테이블 본문 생성
            const tbody = document.createElement('tbody');
            tbody.classList.add('table_font');
            for (let i = 1; i < data.length; i++) {
                const row = document.createElement('tr');
                data[i].forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            }
            table.appendChild(tbody);
        }