require.config({
  baseUrl: '/base',
  paths: {
    knockout: 'bower_components/knockout.js/knockout',
    jquery: 'bower_components/jquery/dist/jquery'
  }
});

require(['spec/number'], window.__karma__.start);
