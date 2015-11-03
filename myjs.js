// Filters
var filters = {
  all: function(todos){
    return todos;
  },
  active: function(todos){
    return todos.filter(function(todo) {
      return !todo.completed;
    })
  },
  completed: function(todos){
    return todos.filter(function(todo) {
      return todo.completed;
    })
  }
};


// Vue app
var app = Vue.extend({
  data: function(){
    return {
      newTitle: "",
      todos: [
        { title: "text 1", completed: false },
        { title: "text 2", completed: false }
      ]
    }
  },
  methods: {
    addTodo: function(){
      var title = this.newTitle.trim()
      if (title) {
        this.todos.push({ title: title, completed: false })
        this.newTitle = ""
      }
    },
    removeTodo: function(todo) {
      this.todos.$remove(todo);
    }
  },
  computed: {
    all: function(){
      // return this.totos.length;
      return filters.all(this.todos).length;
    },
    active: function(){
      return filters.active(this.todos).length;
    },
    completed: function(){
      return filters.completed(this.todos).length;
    }
  },
})

// Components
var One = Vue.extend({
  template: "<p>This is page one! {{someText}}</p>",
  data: function(){
    return {
      someText: "Some output"
    }
  }
})


var Two = Vue.extend({
  template: "<p>This is page two!</p>"
})


// Plugins
Vue.use(VueRouter)
Vue.use(VueResource)


// Router
var router = new VueRouter()

router.map({
  "/one": {
    component: One
  },
  "/two": {
    component: Two
  }
})

router.start(app, "#app")
