require.config({
  baseUrl: '/base',
  paths: {
    knockout: 'bower_components/knockout/dist/knockout',
    jquery: 'bower_components/jquery/dist/jquery'
  }
});

require(['spec/number'], window.__karma__.start);
