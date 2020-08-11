const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const ChaiPluginAssertType = require('chai-asserttype-extra');
chai.use(ChaiPluginAssertType);
const assertArrays = require('chai-arrays');
chai.use(assertArrays);

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);
const {Pet}=require('../models/pets');



describe('post - pets', () => {
  it('should fail to create a pet without a Name', async () => {
    const res = await request(app).post('/pets').send({
      age: '16',
      colour: 'blue',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"Name" is required');
  });

  it('should create a pet', async () => {
    const pet = {
      Name: 'piku',
      age: 5,
      colour: 'ash',
    };
    const res = await request(app).post('/pets').send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.Name).to.equal(pet.Name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.colour).to.equal(pet.colour);
  });
});


describe('get  - pets', () => {
  let pet;
  beforeEach(() => {
     pet = new Pet({
      Name: 'pikachu',
      age: 9,
      colour: 'black',
    });
   pet.save();
  
  });
  
    
    it('should get all pets', async () => {
      
        const pet = new Pet({
          Name:"hassi",
          age:9,
          colour:"black"
        });
         await pet.save();
     
         const res = await request(app).get('/pets');
         expect(res.status).to.equal(200);
         expect(res.body).to.be.array();

    });

    it('should get the pets', async () => {
        const res = await request(app).get("/pets/"+pet._id);
        expect(res.status).to.equal(200);
        expect(res.body.Name).to.equal(pet.Name);
        expect(res.body.age).to.equal(pet.age);
        expect(res.body.colour).to.equal(pet.colour);
        expect(res.body).to.be.object();
       
      });
  });


  
  describe('delete  - pets',() => {
    let pet;
    beforeEach(() => {
       pet = new Pet({
        Name:"piku",
        age:9,
        colour:"black"
      });
       pet.save();
    });
    
    
    it('should delete the pets', async () => {
     

        const res = await request(app).delete("/pets/"+pet._id);
        expect(res.status).to.equal(200);
    
      });
  
    it('should delete all pets', async () => {

      const res = await request(app).delete('/pets/deleteall');
      expect(res.status).to.equal(200);
    
    });

    
  });