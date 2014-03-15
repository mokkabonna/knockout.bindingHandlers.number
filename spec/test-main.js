require.config({
  baseUrl: '/base', //karma servers files from base
  paths: {
    knockout: 'bower_components/knockout.js/knockout',
    jquery: 'bower_components/jquery/dist/jquery'
  }
});

require(['spec/number'], window.__karma__.start);
