angular.module('vendorModules', [
    'ngMessages', //nice validation messages
    'ngMaterial', //angular material
    'ui.router', // Handles state changes and routing of the site
    'ui.route', // Module to check for active urls, nothing to do with ui.router
    'ui.keypress', // Module to check for active urls, nothing to do with ui.router
    'ui.inflector', //Module to Humanise strings (camelCased or pipe-case etc)
    'ui.validate', //Module to add custom validation to inputs
    'ngAnimate', //angular animate
    'ngSanitize', //angular sanitise
    'hljs' //syntax highlighted code blocks - https://github.com/pc035860/angular-highlightjs
]);