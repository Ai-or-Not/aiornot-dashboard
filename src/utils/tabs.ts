const imageTab = document.getElementById('image-tab') as Element; //  Image tab
const audioTab = document.getElementById('audio-tab') as Element; // Audio tab
const pdetTab = document.getElementById('pdet-tab') as Element; // Person detection tab

/**
 * Show with tab is active at currenc moment
 */
export function activeTab() {
    if (imageTab.classList.contains('w--current')) {
        return 'image';
    }
    if (audioTab.classList.contains('w--current')) {
        return 'audio';
    }
    if (pdetTab.classList.contains('w--current')) {
        return 'pdet';
    }
}
