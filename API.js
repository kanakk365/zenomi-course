// API.js - SCORM 1.2 API Wrapper for GitHub Pages
var API = {
  initialized: false,
  data: {
    "cmi.core.student_name": "",
    "cmi.core.student_id": "",
    "cmi.core.lesson_status": "not attempted",
    "cmi.core.score.raw": "0",
    "cmi.core.score.max": "100",
    "cmi.core.score.min": "0",
    "cmi.core.total_time": "00:00:00",
    "cmi.core.entry": "ab-initio",
    "cmi.core.exit": "",
    "cmi.suspend_data": ""
  },

  LMSInitialize: function(param) {
    if (!this.initialized) {
      // Try to load saved data from localStorage
      var saved = localStorage.getItem('scorm_data');
      if (saved) {
        try {
          this.data = JSON.parse(saved);
        } catch(e) {
          console.log("Could not load saved SCORM data");
        }
      }
      this.initialized = true;
      return "true";
    }
    return "false";
  },

  LMSFinish: function(param) {
    if (this.initialized) {
      // Save data to localStorage
      localStorage.setItem('scorm_data', JSON.stringify(this.data));
      this.initialized = false;
      return "true";
    }
    return "false";
  },

  LMSGetValue: function(element) {
    if (!this.initialized) {
      return "";
    }
    return this.data[element] || "";
  },

  LMSSetValue: function(element, value) {
    if (!this.initialized) {
      return "false";
    }
    this.data[element] = value;
    // Auto-save to localStorage
    localStorage.setItem('scorm_data', JSON.stringify(this.data));
    return "true";
  },

  LMSCommit: function(param) {
    if (!this.initialized) {
      return "false";
    }
    // Data is already saved in LMSSetValue
    return "true";
  },

  LMSGetLastError: function() {
    return "0";
  },

  LMSGetErrorString: function(errorCode) {
    return "No Error";
  },

  LMSGetDiagnostic: function(errorCode) {
    return "No Error";
  }
};

// Make API available globally
window.API = API;

