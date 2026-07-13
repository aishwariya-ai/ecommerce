export default{
    install (app)
    {
        const rules = {
            required:(value)=>!!value|| "This field is required",
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email address."
        }
        app.config.globalProperties.$rules= rules
        app.provide("rules",rules)

    }
}