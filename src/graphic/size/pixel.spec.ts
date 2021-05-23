import Pixel from "./pixel";

describe('Pixel', () => {
  it('should return divided percentage',  () => {
    const actual: Pixel = new Pixel(896).multiply(new Pixel(56).divideBy(new Pixel(896)))
    expect(actual.value).toEqual(new Pixel(56).value);
  });
});
