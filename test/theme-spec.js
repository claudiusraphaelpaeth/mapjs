/*global MAPJS, describe, beforeEach, it, expect*/
describe('MAPJS.Theme', function () {
	'use strict';
	var underTest;
	beforeEach(function () {
		var theme = {
			'node': {
				'default': {
					'cornerRadius': 10.0,
					'backgroundColor': 'transparent'
				},
				'special': {
					'cornerRadius': 1.0
				},
				'sharp': {
					'cornerRadius': 0.0
				}
			}
		};
		underTest = new MAPJS.Theme(theme);
	});
	describe('attributeValue', function () {
		it('should return default value for empty theme', function () {
			underTest = new MAPJS.Theme({});
			expect(underTest.attributeValue(['node'], ['special', 'default'], ['cornerRadius'], 100)).toEqual(100);
		});
		it('should return first value found', function () {
			expect(underTest.attributeValue(['node'], ['special', 'default'], ['cornerRadius'], 100)).toEqual(1.0);
		});
		it('should return a secondary style value if primary not configured', function () {
			expect(underTest.attributeValue(['node'], ['special', 'default'], ['backgroundColor'], '#FFFFFF')).toEqual('transparent');
		});
		it('should return falsy values', function () {
			expect(underTest.attributeValue(['node'], ['sharp', 'special', 'default'], ['cornerRadius'], 100)).toEqual(0.0);
		});
		it('should return the fallback value if nothing configured', function () {
			expect(underTest.attributeValue(['node'], ['special', 'default'], ['foregroundColor'], '#FFFFFF')).toEqual('#FFFFFF');
		});
		it('should return the fallback value if no styles supplied', function () {
			expect(underTest.attributeValue(['node'], [], ['backgroundColor'], '#FFFFFF')).toEqual('#FFFFFF');
		});
	});
});
