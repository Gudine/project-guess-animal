const disabledButton = require('../src/disabledButton.js')

describe ('Verificar se a função disabledButton funciona como o esperado.', () => {
  it ('Testa se disabledButton é uma função.', () => {
    const actual = typeof disabledButton;
    const expected = 'function';

    expect(actual).toBe(expected);
  });

  it ('Testa se a propriedade disabled é alterada para true.', () => {
    const actual = [
      { disabled: false },
      { disabled: false },
    ];
    disabledButton(actual);
    const expected = [
      { disabled: true },
      { disabled: true },
    ];

    expect(actual).toEqual(expected);
  })
});