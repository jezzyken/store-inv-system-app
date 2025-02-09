// In your main.js or plugins/vuetify.js
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#124829',  
        secondary: '#27ae60', 
        accent: '#3498db',   
        error: '#e74c3c',     
        info: '#3498db',      
        success: '#1b6b3f',  
        warning: '#f1c40f',   
        background: '#ecf0f1',
        surface: '#ffffff',    
        textPrimary: '#2c3e50' 
      }
    }
  }
})