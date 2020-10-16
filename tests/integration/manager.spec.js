// Subir o servidor no supertest
// Criar variável de ambiente para rodar o teste no bd de teste

const request = require('supertest');
const app = require('../../src/app');
const connection = require("../../src/database");
const { cpf } = require('cpf-cnpj-validator');
const truncate = require("./truncate");

describe( 'MANAGERS', () => {

    afterAll( () => {
        connection.close();
    });

    beforeEach( async ( done ) => {
        await truncate(connection.models);

        done();
    });

    it("É possível criar um novo gerente", async () => {
        const response = await request( app ).post( "/managers" ).send({
            "name" : "Rafael Leme",
            "cpf" : cpf.generate(),
            "email" : "teste@gmail.com",
            "cellphone" : "5511912345678",
            "password" : "123456"
        });

        expect( response.ok ).toBeTruthy();

        expect( response.body ).toHaveProperty( "id" );
    });

    it("Não é possível cadastrar um gerente com CPF existente", async () => {
        let cpfGerente = cpf.generate();

        let response = await request( app ).post( "/managers" ).send({
            "name" : "Rafael Leme",
            "cpf" : cpfGerente,
            "email" : "teste@gmail.com",
            "cellphone" : "5511912345678",
            "password" : "123456"
        });

        response = await request( app ).post( "/managers" ).send({
            "name" : "Rafael Lemes",
            "cpf" : cpfGerente,
            "email" : "teste1@gmail.com",
            "cellphone" : "5511912345679",
            "password" : "123456"
        });

        expect( response.ok ).toBeFalsy();

        expect( response.body ).toHaveProperty( "error" );

        expect( response.body.error ).toEqual( "cpf already exists" );
    })
})