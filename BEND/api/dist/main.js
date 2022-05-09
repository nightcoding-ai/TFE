"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const bodyParser = require("body-parser");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        allowedHeaders: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"],
        exposedHeaders: ['Content-Disposition'],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Endpoints')
        .setDescription('Every call for CRUD methods on Players, Teams, Tournaments, Matches, Join requests and Team invitation. Project does not provide a RESTFUL API.')
        .setVersion('1.0')
        .addTag('NEEDLESS BACKEND')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map