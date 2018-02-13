import { Directive, ElementRef } from '@angular/core';
import 'intersection-observer';

@Directive({
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective {

	constructor(el: ElementRef) {
		let directive = this;

		const config = {
			rootMargin: '100% 0px'
		};

		let observer = new IntersectionObserver(function (entries, self) {
			entries.forEach((entry: any) => {
				if (entry.isIntersecting) {
					directive.preloadImage(entry.target);
					observer.unobserve(entry.target);
				}
			});
		}, config);

		observer.observe(el.nativeElement);
	}

	preloadImage(img) {
		const src = img.getAttribute('data-src');
		if (!src) { return; }
		img.src = src;
	}
}
