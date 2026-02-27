/* --- script.js --- */
const ICON_CHEV_RIGHT = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
const ICON_CHEV_DOWN = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
const ICON_UP = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
const ICON_DOWN = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
const ICON_TRASH = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
const ICON_COPY = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const ICON_MINUS = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
const ICON_GEAR = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
const ICON_PLUS = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;

window.onload = function() {
    const savedTheme = localStorage.getItem('appTheme') || 'ios';
    document.getElementById('themeSelector').value = savedTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);

    loadData();
    const updateData = () => { saveData(); generateText(); };
    document.getElementById('shippingCost').addEventListener('input', updateData);
    document.querySelectorAll('input[name="bank"]').forEach(radio => radio.addEventListener('change', updateData));
    document.getElementById('collectionsContainer').addEventListener('input', updateData);
    generateText(); 
};

function changeTheme() {
    const theme = document.getElementById('themeSelector').value;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('appTheme', theme);
}

function saveData() {
    localStorage.setItem('shippingCost', document.getElementById('shippingCost').value);
    localStorage.setItem('bank', document.querySelector('input[name="bank"]:checked').value);

    const collections = [];
    document.querySelectorAll('.collection-block').forEach(block => {
        const colName = block.querySelector('.collectionName').value;
        const isCollapsed = block.classList.contains('collapsed');
        const products = [];
        
        block.querySelectorAll('.product-item').forEach(item => {
            const name = item.querySelector('.productName').value;
            const price = item.querySelector('.productPrice').value;
            const qty = item.querySelector('.productQty').value;
            const optionRows = [];
            
            item.querySelectorAll('.option-row').forEach(rowEl => {
                const availableSizes = [];
                const selectedSizes = [];
                rowEl.querySelectorAll('.pill[data-size]').forEach(pill => {
                    const size = pill.getAttribute('data-size');
                    availableSizes.push(size);
                    if (pill.classList.contains('active')) selectedSizes.push(size);
                });
                optionRows.push({ availableSizes, selectedSizes });
            });
            products.push({ name, price, qty, optionRows });
        });
        collections.push({ colName, isCollapsed, products });
    });
    localStorage.setItem('orderDataV3', JSON.stringify(collections));
}

function loadData() {
    if (localStorage.getItem('shippingCost')) document.getElementById('shippingCost').value = localStorage.getItem('shippingCost');
    if (localStorage.getItem('bank')) {
        const bankInput = document.querySelector(`input[name="bank"][value="${localStorage.getItem('bank')}"]`);
        if(bankInput) bankInput.checked = true;
    }

    const container = document.getElementById('collectionsContainer');
    container.innerHTML = ''; 
    let savedData = JSON.parse(localStorage.getItem('orderDataV3'));
    
    if (savedData && savedData.length > 0) {
        savedData.forEach(col => {
            const block = addCollectionBlock(col.colName, col.isCollapsed);
            if(col.products.length > 0) {
                col.products.forEach(p => {
                    block.querySelector('.productList').appendChild(createProductItemElement(p.name, p.price, p.qty, p.optionRows));
                });
            } else {
                block.querySelector('.productList').appendChild(createProductItemElement()); 
            }
        });
    } else {
        const block = addCollectionBlock('');
        block.querySelector('.productList').appendChild(createProductItemElement());
    }
}

function exportData() {
    saveData();
    const data = localStorage.getItem('orderDataV3');
    if (!data || data === '[]') { alert('ไม่มีข้อมูล'); return; }
    const encodedData = btoa(encodeURIComponent(data));
    navigator.clipboard.writeText(encodedData).then(() => alert('📋 คัดลอกโค้ดสำเร็จ!')).catch(() => prompt('คัดลอกโค้ดนี้:', encodedData));
}

function importData() {
    const code = prompt('📥 วางโค้ดที่คัดลอกมา:');
    if (!code) return;
    try {
        localStorage.setItem('orderDataV3', decodeURIComponent(atob(code)));
        loadData(); generateText(); alert('✅ นำเข้าสำเร็จ!');
    } catch(e) { alert('❌ โค้ดไม่ถูกต้อง'); }
}

function toggleCollection(btn) {
    const block = btn.closest('.collection-block');
    block.classList.toggle('collapsed');
    btn.innerHTML = block.classList.contains('collapsed') ? ICON_CHEV_RIGHT : ICON_CHEV_DOWN;
    saveData();
}

function moveCollectionUp(btn) {
    const block = btn.closest('.collection-block');
    if (block.previousElementSibling) { block.parentNode.insertBefore(block, block.previousElementSibling); saveData(); generateText(); }
}

function moveCollectionDown(btn) {
    const block = btn.closest('.collection-block');
    if (block.nextElementSibling) { block.parentNode.insertBefore(block.nextElementSibling, block); saveData(); generateText(); }
}

function addCollectionBlock(colName = '', isCollapsed = false) {
    const container = document.getElementById('collectionsContainer');
    const block = document.createElement('div');
    block.className = 'collection-block';
    if(isCollapsed) block.classList.add('collapsed');
    
    block.innerHTML = `
        <div class="collection-header">
            <div class="header-left">
                <button class="btn-toggle-col" onclick="toggleCollection(this)">${isCollapsed ? ICON_CHEV_RIGHT : ICON_CHEV_DOWN}</button>
                <input type="text" class="collectionName" placeholder="ชื่อคอลเลคชั่น (ไม่ระบุก็ได้)" value="${colName}" style="margin: 0;">
            </div>
            <div class="header-actions">
                <button class="btn-icon btn-move" onclick="moveCollectionUp(this)" title="เลื่อนขึ้น">${ICON_UP}</button>
                <button class="btn-icon btn-move" onclick="moveCollectionDown(this)" title="เลื่อนลง">${ICON_DOWN}</button>
                <button class="btn-icon btn-remove" onclick="removeCollectionBlock(this)" title="ลบชุดนี้">${ICON_TRASH}</button>
            </div>
        </div>
        <div class="collection-body">
            <div class="productList"></div>
            <button class="btn-add-row" style="margin-top: 1rem; width: 100%; justify-content: center; background: var(--theme-surface-alt);" onclick="handleAddProductClick(this)">
                ${ICON_PLUS} เพิ่มสินค้า
            </button>
        </div>
    `;
    container.appendChild(block);
    if(colName === '' && arguments.length === 0) {
        block.querySelector('.productList').appendChild(createProductItemElement());
        saveData(); generateText();
    }
    return block;
}

function removeCollectionBlock(btn) {
    if(confirm('ลบคอลเลคชั่นนี้ทิ้ง?')) { btn.closest('.collection-block').remove(); saveData(); generateText(); }
}

function clearAllPills() {
    document.querySelectorAll('.pill.active').forEach(pill => pill.classList.remove('active'));
    document.querySelectorAll('.productQty').forEach(qty => qty.value = 1);
    saveData(); generateText();
}

function handleAddProductClick(btn) {
    btn.previousElementSibling.appendChild(createProductItemElement());
    saveData(); generateText();
}

function moveProductUp(btn) {
    const item = btn.closest('.product-item');
    if (item.previousElementSibling) { item.parentNode.insertBefore(item, item.previousElementSibling); saveData(); generateText(); }
}

function moveProductDown(btn) {
    const item = btn.closest('.product-item');
    if (item.nextElementSibling) { item.parentNode.insertBefore(item.nextElementSibling, item); saveData(); generateText(); }
}

function createOptionRowHtml(availableSizes, selectedSizes) {
    let pillsHtml = availableSizes.map(s => `<div class="pill ${selectedSizes.includes(s) ? 'active' : ''}" onclick="togglePill(this)" data-size="${s}">${s}</div>`).join('');
    let actionsHtml = `<button class="pill-action" onclick="editPillsList(this)" title="ตั้งค่าตัวเลือก/ลบแถว">${ICON_GEAR}</button>`;
    return `<div class="option-row"><div class="size-pills">${pillsHtml}${actionsHtml}</div></div>`;
}

function createProductItemElement(name = '', price = '', qty = 1, optionRowsArray = null) {
    const newItem = document.createElement('div');
    newItem.className = 'product-item';
    let rows = [];
    if (optionRowsArray !== null) {
        if (optionRowsArray.length === 0) rows = [ { availableSizes: ['-'], selectedSizes: [] } ];
        else rows = optionRowsArray;
    } else {
        rows = [ { availableSizes: ['S', 'M', 'L', 'XL', '2XL'], selectedSizes: [] } ];
    }
    let rowsHtml = rows.map((r) => createOptionRowHtml(r.availableSizes, r.selectedSizes)).join('');
    newItem.innerHTML = `
        <div class="product-header-row">
            <input type="text" class="productName" placeholder="ชื่อสินค้า" value="${name}">
            <input type="number" class="productPrice" placeholder="ราคา" value="${price}">
            <input type="number" class="productQty" placeholder="ชิ้น" title="จำนวนชิ้น" value="${qty || 1}" min="1">
            <div class="product-actions">
                <button class="btn-icon btn-move" onclick="moveProductUp(this)" title="เลื่อนขึ้น">${ICON_UP}</button>
                <button class="btn-icon btn-move" onclick="moveProductDown(this)" title="เลื่อนลง">${ICON_DOWN}</button>
                <button class="btn-icon btn-clone" onclick="cloneProduct(this)" title="คัดลอก">${ICON_COPY}</button>
                <button class="btn-icon btn-remove" onclick="removeProduct(this)" title="ลบ">${ICON_MINUS}</button>
            </div>
        </div>
        <div class="product-options-container">${rowsHtml}</div>
        <button class="btn-add-row" onclick="addOptionRow(this)">${ICON_PLUS} เพิ่มตัวเลือกบรรทัดถัดไป</button>
    `;
    return newItem;
}

function addOptionRow(btn) {
    const newSizesStr = prompt('ตั้งค่าตัวเลือก (คั่นด้วยลูกน้ำ ,):');
    if (newSizesStr && newSizesStr.trim() !== '') {
        let newSizes = newSizesStr.split(',').map(s => s.trim()).filter(s => s !== '');
        if (newSizes.length > 0) {
            btn.previousElementSibling.insertAdjacentHTML('beforeend', createOptionRowHtml(newSizes, []));
            saveData(); generateText();
        }
    }
}

function cloneProduct(btn) {
    const item = btn.closest('.product-item');
    const rows = Array.from(item.querySelectorAll('.option-row')).map(rowEl => ({
        availableSizes: Array.from(rowEl.querySelectorAll('.pill[data-size]')).map(p => p.getAttribute('data-size')),
        selectedSizes: []
    }));
    item.parentNode.insertBefore(createProductItemElement(item.querySelector('.productName').value, item.querySelector('.productPrice').value, 1, rows), item.nextSibling);
    saveData(); generateText();
}

function togglePill(pill) { pill.classList.toggle('active'); saveData(); generateText(); }

function editPillsList(btn) {
    const container = btn.closest('.size-pills');
    const row = container.closest('.option-row');
    const item = row.closest('.product-item');
    const currentSizes = Array.from(container.querySelectorAll('.pill[data-size]')).map(p => p.getAttribute('data-size'));
    
    const newSizesStr = prompt('ตั้งค่าปุ่ม (คั่นด้วยลูกน้ำ ,)\n* หากต้องการลบแถวนี้ออก ให้ลบข้อความออกให้หมดแล้วกด OK:', currentSizes.join(','));

    if (newSizesStr !== null) {
        let newSizes = newSizesStr.split(',').map(s => s.trim()).filter(s => s !== '');
        if (newSizes.length === 0) {
            const allRows = item.querySelectorAll('.option-row');
            if (allRows.length <= 1) newSizes = ['-'];
            else { row.remove(); saveData(); generateText(); return; }
        }
        const selectedSizes = Array.from(container.querySelectorAll('.pill.active')).map(p => p.getAttribute('data-size'));
        row.outerHTML = createOptionRowHtml(newSizes, selectedSizes);
        saveData(); generateText();
    }
}

function removeProduct(btn) { btn.closest('.product-item').remove(); saveData(); generateText(); }
function clearData() { if(confirm('ล้างข้อมูลทั้งหมด?')) { localStorage.clear(); location.reload(); } }

function generateText() {
    const shippingValue = parseFloat(document.getElementById('shippingCost').value) || 0;
    let finalProductsText = '', labelLines = [], validPrices = [], hasMissingPrice = false, productsSum = 0;
    
    document.querySelectorAll('.collection-block').forEach(block => {
        const colName = block.querySelector('.collectionName').value.trim();
        let colText = '', colLabelProducts = [], mergedMap = {}, orderArr = [];
        
        block.querySelectorAll('.product-item').forEach(item => {
            const nameVal = item.querySelector('.productName').value.trim();
            const rawPrice = item.querySelector('.productPrice').value.trim();
            const qtyVal = parseInt(item.querySelector('.productQty').value.trim()) || 1; 
            const rowEls = item.querySelectorAll('.option-row');
            
            if (rowEls.length === 0 || (rowEls.length === 1 && rowEls[0].querySelector('.pill.active[data-size="-"]'))) {
                if (nameVal !== '') {
                    const hasOtherActive = item.querySelector('.pill.active:not([data-size="-"])');
                    if (!hasOtherActive) {
                        if (!mergedMap[nameVal]) { mergedMap[nameVal] = []; orderArr.push(nameVal); }
                        let token = qtyVal > 1 ? `x${qtyVal}` : '';
                        mergedMap[nameVal].push(token);
                        if (rawPrice === '') {
                            validPrices.push('***'); hasMissingPrice = true;
                        } else {
                            const pVal = parseFloat(rawPrice);
                            validPrices.push(qtyVal > 1 ? `${pVal}x${qtyVal}` : pVal);
                            productsSum += (pVal * qtyVal);
                        }
                    }
                }
            } 
            else {
                let textParts = [], activeCounts = [0];
                rowEls.forEach(rowEl => {
                    const actives = rowEl.querySelectorAll('.pill.active');
                    activeCounts.push(actives.length);
                    if (actives.length > 0) {
                        const validSizes = Array.from(actives).map(p => p.getAttribute('data-size')).filter(s => s !== '-');
                        if (validSizes.length > 0) textParts.push(validSizes.join(',')); 
                    }
                });

                let totalActive = Math.max(...activeCounts);

                if (nameVal !== '' && totalActive > 0) {
                    if (!mergedMap[nameVal]) { mergedMap[nameVal] = []; orderArr.push(nameVal); }
                    let token = textParts.length > 0 ? `(${textParts.join(' ')})` : '';
                    if (qtyVal > 1) token += (token !== '' ? ` x${qtyVal}` : `x${qtyVal}`); 
                    
                    if (token !== '') mergedMap[nameVal].push(token);
                    else mergedMap[nameVal].push('');

                    if (rawPrice === '') {
                        for(let i=0; i<totalActive; i++) validPrices.push('***');
                        hasMissingPrice = true;
                    } else {
                        const pVal = parseFloat(rawPrice);
                        for(let i=0; i<totalActive; i++) {
                            validPrices.push(qtyVal > 1 ? `${pVal}x${qtyVal}` : pVal);
                            productsSum += (pVal * qtyVal);
                        }
                    }
                }
            }
        });

        orderArr.forEach(name => {
            const sizes = mergedMap[name].filter(s => s !== '').join(', ');
            const str = sizes ? `- ${name} ${sizes}\n` : `- ${name}\n`;
            colText += str; colLabelProducts.push(sizes ? `${name} ${sizes}` : `${name}`);
        });

        if (colText !== '') finalProductsText += (colName !== '' ? `${colName}\n` : '') + colText + '\n';
        if (colLabelProducts.length > 0) labelLines.push(colName !== '' ? `${colName} = ${colLabelProducts.join(' / ')}` : colLabelProducts.join(' / '));
    });
    
    let pStr = hasMissingPrice ? '***' : (validPrices.length > 0 ? validPrices.join(' + ') + (shippingValue > 0 ? ` + ${shippingValue} = ${productsSum + shippingValue}` : ` = ${productsSum}`) : (shippingValue > 0 ? `${shippingValue} = ${shippingValue}` : '0 = 0'));
    if (hasMissingPrice && shippingValue > 0) pStr = `*** + ${shippingValue} = ***`;

    let bankText = '';
    for (const radio of document.getElementsByName('bank')) {
        if (radio.checked) {
            if (radio.value === 'TTB') bankText = "ธ.ไทยธนชาต TTB\n622-2-84950-4\nกุลจิรา ล้อพงศ์ไพบูลย์";
            else if (radio.value === 'SCB') bankText = "ธ.ไทยพาณิชย์ SCB\n407-811653-8\nกุลจิรา ตู้จินดา";
            else if (radio.value === 'KBANK') bankText = "ธ.กสิกร KBANK\n026-1-56003-8\nกุลจิรา ตู้จินดา";
            else if (radio.value === 'GSB') bankText = "ธ.ออมสิน GSB\n020478034752\nกุลจิรา ล้อพงศ์ไพบูลย์";
        }
    }

    document.getElementById('outputText').value = finalProductsText === '' ? '- ไม่มีรายการสินค้า -\n\n' : `${finalProductsText}ค่าจัดส่ง: ${shippingValue || 0} บาท\nยอดรวม: ${pStr} บาท\n\n--------------------------\nชำระเงินได้ที่:\n${bankText}\n\nโอนเงินแล้วกรุณาส่งสลิป และที่อยู่ให้ด้วยนะคะ`;
    document.getElementById('outputLabelText').value = labelLines.join('\n');
}

function copyText(id) {
    const el = document.getElementById(id);
    if(el.value.trim() === '') return;
    el.select(); document.execCommand('copy'); window.getSelection().removeAllRanges();
}

let helpLoaded = false;
async function toggleHelp() {
    const content = document.getElementById('helpContent');
    const icon = document.getElementById('help-icon');
    const inner = document.getElementById('helpInner');
    const loading = document.getElementById('helpLoading');

    if (content.classList.contains('open')) {
        content.classList.remove('open');
        icon.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('open');
        icon.style.transform = 'rotate(180deg)';
        if (!helpLoaded) {
            loading.style.display = 'block';
            try {
                const response = await fetch('help.html');
                if (response.ok) {
                    inner.innerHTML = await response.text();
                    helpLoaded = true;
                } else {
                    inner.innerHTML = '<p style="color: var(--theme-danger); text-align: center; margin-top: 2rem;">ไม่สามารถโหลดคู่มือได้ (อย่าลืมสร้างไฟล์ help.html ในโปรเจกต์นะครับ)</p>';
                }
            } catch (error) {
                inner.innerHTML = '<p style="color: var(--theme-danger); text-align: center; margin-top: 2rem;">เกิดข้อผิดพลาดในการโหลดไฟล์คู่มือ</p>';
            } finally {
                loading.style.display = 'none';
            }
        }
    }
}
