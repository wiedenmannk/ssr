declare module "xhr2" {
  class XMLHttpRequest extends globalThis.XMLHttpRequest {
  	// Alle zusätzlichen Eigenschaften und Methoden hier definieren, wenn nötig
  }
  export { XMLHttpRequest };
}

