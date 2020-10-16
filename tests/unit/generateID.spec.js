const generatedID = require('../../src/utils/generateUUID');

// Se é possível gerar um uuid único
// Se está vindo um id
// Se esse id é uma string
// Se o tamanho da string é o que eu espero, 36 caracteres

describe("generateUUID", () => {
    it("Se é possível gerar um uuid único", () => {
        const id = generatedID();

        expect( id ).toBeDefined();

        expect( typeof id ).toBe( "string" );

        expect( id ).toHaveLength( 36 );
    } )
})