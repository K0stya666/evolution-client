console.log('Global fix applied');

if (typeof global === 'undefined') {
    (window as any).global = window;
}