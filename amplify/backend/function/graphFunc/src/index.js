const { get } = require("https");

const todos = [
    {id: 1, name: "tee ära"},
    {id: 2, name: "tee see ka ära"}
]

const getTodos = () => {
    return todos;
}

const getTodoById = (id) => {
    return todos.filter(todo => todo.id === id)
}

const resolvers = {
    Query: {
        todos: () => {
            return getTodos();
        },
        getTodo: (ctx) => {
            return getTodoById(ctx.arguments.id);
        }
    }
}



exports.handler = async (event) => {
    const typeHandler = resolvers[event.typeName];
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
