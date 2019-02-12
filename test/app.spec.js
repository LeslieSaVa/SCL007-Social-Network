import {writeUserData,enviarConvalidacionAFirebase, readPost,deletePost, guardandoComentarios,likePost, biography} from '../src/js/app';
const chai = require('chai');
const jest = require('jest');

var firebasemock = require('firebase-mock');
var mockdatabase = new firebasemock.MockFirebase();

  


describe( 'La persona debería poder entrar a la app', ()=>{

    describe('writeUserData', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof writeUserData, 'function');
      });
      it('debería tener una referencia', ()=>{
        ( writeUserData, (path) => {
            return path ? mockdatabase.child(path) : mockdatabase;
          });
      });
      
    });

  }),

  describe( 'La persona debería poder guardar una publicación', ()=>{

    describe('enviarConvalidacionAFirebase', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof enviarConvalidacionAFirebase, 'function');
      });
      it('debería tener una referencia', ()=>{
        ( enviarConvalidacionAFirebase, (path) => {
            return path ? enviarConvalidacionAFirebase.child(path) : mockdatabase;
          });
      
    });

  })  

})

  describe( 'La persona debería poder ver una publicación', ()=>{

    describe('readPost', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof readPost, 'function');
      });
      it('debería tener una referencia', ()=>{
        ( readPost, (path) => {
            return path ? mockdatabase.child(path) : mockdatabase;
          });
    });

  }) 
})
  describe( 'La persona debería poder borrar una publicación', ()=>{

    describe('deletePost', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof deletePost, 'function');
      });
      it('debería tener una referencia', ()=>{
        ( deletePost, (path) => {
            return path ? mockdatabase.child(path) : mockdatabase;
          });
      
    });

  })

})

  describe( 'La persona debería poder comentar una publicación', ()=>{

    describe('guardandoComentarios', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof guardandoComentarios, 'function');
      });
      it('debería tener una referencia', ()=>{
        ( guardandoComentarios, (path) => {
            return path ? mockdatabase.child(path) : mockdatabase;
          });
      
    });

  })
})

  describe( 'La persona debería poder dar like a una publicación', ()=>{

    describe('likePost', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof likePost, 'function');
      });
      it('debería tener una referencia', ()=>{
        ( likePost, (path) => {
            return path ? likePost.child(path) : likePost;
          });
      
    });

  })

})

  describe( 'La persona debería poder escribir su biografía en perfil', ()=>{

    describe('biography', ()=>{

      it('debería ser una función', ()=>{
        chai.assert.equal(typeof biography, 'function');
      });
      it('debería tener una referencia', ()=>{
        ( biography, (path) => {
            return path ? biography.child(path) : biography;
          });
      
    });

  })

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