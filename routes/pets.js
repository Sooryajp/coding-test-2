const express=require("express");
const Joi = require('@hapi/joi');
var ObjectId = require('mongodb').ObjectId;

const mongo=require("../test/utils");
const {Petsdb,Pet }= require('../models/pets');
const { validateBody } = require('../middlewares/route');


const router=express.Router();

router.post(
    '/',
    validateBody(Joi.object().keys({
      Name: Joi.string().required().description('Pets name'),
      age: Joi.number().integer().required().description('Pets age'),
      colour: Joi.string().required().description('Pets colour'),
    }),
    {
      stripUnknown: true,
    }),
    async (req, res, next) => {
      try {
        const pet = new Pet(req.body);
        await pet.save();
        res.status(201).json(pet);
      } catch (e) {

        next(e);
      }
    }
  );
  
  router.get(
    '/',async (req, res, next) => {
      try {
        const petsinDb= await Petsdb.collection("pets").find().toArray();
        
        res.status(200).json(petsinDb);
        
      
      } catch (e) {
          next(e);
      }
    }
  );

  router.get(
    '/:id',async (req, res, next) => {
      try {
        o_id=new ObjectId(req.params.id)

        const pet= await Petsdb.collection("pets").findOne({_id:o_id});
        res.status(200).json(pet);
      } catch (e) {
          next(e);
      }
    }
  );



  router.delete(
    '/deleteall',async (req, res, next) => {
      try {
        const petsinDb= await Petsdb.collection("pets").deleteMany();
        res.status(200).json({message:"All pets are deleted"});
      } catch (e) {
          next(e);
      }
    }
  );

  router.delete(
    '/:id',async (req, res, next) => {
      try {
        const pet= await Petsdb.collection("pets").deleteOne({_id:new ObjectId(req.params.id)});
     
        res.status(200).json({message:"deleted pet"});
      } catch (e) {
          next(e);
      }
    }
  );


  module.exports = router;