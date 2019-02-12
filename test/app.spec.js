import {writeUserData,enviarConvalidacionAFirebase, readPost,deletePost, guardandoComentarios,likePost, biography} from '../src/js/app';
const chai = require('chai');


describe( 'La persona debería poder entrar a la app', ()=>{

    describe('writeUserData', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof writeUserData, 'function');
      });
     
      
    });

  })

  describe( 'La persona debería poder guardar una publicación', ()=>{

    describe('enviarConvalidacionAFirebase', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof enviarConvalidacionAFirebase, 'function');
      });
      
    });

  })  

  describe( 'La persona debería poder ver una publicación', ()=>{

    describe('readPost', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof readPost, 'function');
      });
      
    });

  }) 
  describe( 'La persona debería poder borrar una publicación', ()=>{

    describe('deletePost', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof deletePost, 'function');
      });
      
    });

  })

  describe( 'La persona debería poder comentar una publicación', ()=>{

    describe('guardandoComentarios', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof guardandoComentarios, 'function');
      });
      
    });

  })

  describe( 'La persona debería poder dar like a una publicación', ()=>{

    describe('likePost', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof likePost, 'function');
      });
      
    });

  })
  describe( 'La persona debería poder escribir su biografía en perfil', ()=>{

    describe('biography', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof biography, 'function');
      });
      
    });

  })





/*
  describe('pokemones', () => {

    it('debería ser un objeto', () => {
      window.assert.equal(typeof window.pokemones, 'object');
    });
  
    describe('pokemones.pokeFilter', () => {
  
      it('debería ser una función', () => {
        window.assert.equal(typeof window.pokemones.pokeFilter, 'function');
      });
  
      it('Debería retornar Balbasaur como primer pokemon de tipo planta', () => {
        window.assert.equal(window.pokemones.pokeFilter(data, 'Grass')[0].name, 'Bulbasaur');
      });
  
      it('Debería retornar Charmander como primer pokemon de tipo fuego', () => {
        window.assert.equal(window.pokemones.pokeFilter(data, 'Fire')[0].name, 'Charmander');
      });
  
    })

  })
  */