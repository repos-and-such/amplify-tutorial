const { get } = require("https");




exports.handler = async (event) => {
    const todos = [
        {id: 1, name: "tee ära"},
        {id: 2, name: "tee see ka ära"}
    ]
    
    const getTodos = () => {
        return todos;
    }
    
    const getTodoById = async (id) => {
        console.log('enne')
        const find = await todos.find(todo => todo.id === id)
        console.log('pärast', find)
        return find;
    }
    
    const resolvers = {
        Query: {
            todos: () => {
                return getTodos();
            },
            getTodo: async (ctx) => {
                return await getTodoById(ctx.arguments.id);
            }
        }
    }

    
    const typeHandler = resolvers[event.typeName];
    const hello = todos.find(todo => todo.id = 1)

    console.log('HEELLLLLOOOO', hello)

    console.log(event)
    if (typeHandler) {
        const resolver = typeHandler[event.fieldName];
        console.log('resolver', resolver)
        console.log('typeHandler', typeHandler)
        console.log('fieldName', event.fieldName)

        if (resolver) {
            const result = await resolver(event);
            console.log(result);
            return result;   
        }
    } else {
        throw new Error("Resolver not found")
    }
    // TODO implement
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Laaaambda!'),
    };
    return response;
};
