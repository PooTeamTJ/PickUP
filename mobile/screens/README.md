This is where every screen in the app will go
The basic structure of every screen is as follows:

1. Imports
   Import only the components you need for that screen so we know what is used. This can get messy later.
2. Arrow function
   Research how arrow functions work but the most imortant thing here is that mostly all screens will take a navigation prop.
   Screens can access more than one prop and navigation is the bare minimum. Like imports, only pass props you'll use and never pass 'props' as a whole. This is called 'destructuring'.
3. Stylesheet
   Pretty straight-forward - This is where all styles will go for that screen. Only use inline styles if it has to be dynamic.
4. Export
   This is so our App.js knows about the screen component and can put it in the main navigation (you'll also have to import it in app.js).
