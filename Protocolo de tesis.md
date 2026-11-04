

|Relevancia........................................................................................................... 2<br>Antecedentes...................................................................................................... 2|
|---|
|Objetivo general................................................................................................... 4|
|Objetivo Específico.............................................................................................. 4|
|Pregunta de Investigacion ..................................................................................... 5|
|Alcance ............................................................................................................... 5|
|Justificación........................................................................................................ 5|
|Marco Metodologico............................................................................................ 5|
|Adaptacion de SCRUM al ciclo de Vida de la Inteligencia Artificial ........................ 6|
|Tabla de Roles.................................................................................................. 6|
|Descripcion de las Fases de SCRUM aplicadas en el proyecto................................. 7|
|Fase de Inicio: Arquitectura de Datos e Ingesta Historica ..................................... 7|
|Fase 2: Desarrollo del Motor de Inferencia y Orquestacion Asincrona ................... 8|
|Fase 3: Capa de Visualizacion Dinamica y Optimizacion de Rutas ........................ 8|
|Fase 4: Evaluacion de integridad y ciclo de retroalimentacion Agil ........................ 8|
|Marco Teorico...................................................................................................... 9|
|Metodologia de Desarrollo Agil: SCRUM ............................................................. 9|
|Tecnologias de Backend y Orquestacion............................................................. 9|
|Framework de Alto Rendimiento: FastAPi............................................................... 9|
|Diseño de la Arquitectura del Sistema................................................................. 10|
|Definicion de EndPoints de la API (FastAPI).......................................................... 11|
|Servicios de Visualizacion y Monitoreo. ............................................................ 12|
|GET /geodata/incidentes .............................................................................. 12|
|GET /prediccion/riesgo ................................................................................. 12|
|Servicios de Inferencia y Pedriccion ................................................................. 12|
|POST /prediccion/riesgo ............................................................................... 12|
|POST /ruta-segura/calcular .......................................................................... 12|
|Servicio de Utilidad y Salud del sistema ............................................................ 12|
|GET /health................................................................................................. 13|
|GET /matedata/clima ................................................................................... 13|
|Servicios de Interaccion Ciudadana ................................................................. 13|
|POST /incidentes/reportar ............................................................................ 13|



|GET /zonas/nombres.................................................................................... 13|
|---|
|Servicios de Transparencia y Metricas .............................................................. 13|
|GET /metricas/modelo ................................................................................. 13|
|GET /estadisticas/historicas ......................................................................... 13|
|Tecnologia de FrontEnd ................................................................................... 13|
|Biblioteca React.JS......................................................................................... 14|
|Biblioteca Leaflet.JS........................................................................................ 14|
|inteligencia Artificial y Aprendizaje Supervisado ................................................... 15|
|Inteligencia Artificial....................................................................................... 15|
|Aprendizaje Supervisado .............................................................................. 15|
|Algoritmos de Clasificacion y bosques Aleatorios .............................................. 15|
|Sistema de Gestion de Bases de Datos................................................................ 16|
|PostgreSQL.................................................................................................... 16|
|Extension PostGis........................................................................................... 17|
|Aseguramiento de Calidad (QA) y pruebas de software ......................................... 20|
|Pruebas Unitarias........................................................................................... 20|
|Pruebas de Integracion .................................................................................... 20|
|Pruebas de Aceptacion ................................................................................... 21|
|Diseño de infraestructura y despliegue (Cloud Hosting) ........................................ 21|
|Alojamiento del frontend (Vercel/ Netlify) ......................................................... 21|
|Alojamiento del Backend y Motor de IA (Render) ................................................ 21|
|Persistencia de Datos (PostgreSQL en la nube) ................................................. 22|
|Marco Legal: Ley787........................................................................................... 22|
|Art. 5. Requisitos para la obtención de datos personales y Art. 6. Consentimiento22|
|Art. 12. Seguridad y Art. 13. Confidencialidad de la Información ......................... 23|
|Seguridad y Proteccion de la informacion............................................................ 23|
|Cifrado en Transito (SSL/TLS) ........................................................................... 23|
|Autenticacion y Autorizacion mediante JWT ...................................................... 23|
|Validacion de Datos y Prevencion de Inyecciones. ............................................. 24|
|Marcos referenciales/antecedentes.................................................................... 24|
|Contexto del Proyecto y Roles Organizacionales .................................................. 25|
|La Policía Nacional: Administrador Estratégico y Custodio de Datos ................... 25|



|1.2 El Ciudadano: Usuario Final y Agente Participativo ....................................... 25|
|---|
|Hipotesis .............................................................................................................. 26|
|Eficiencia y Accesibilidad ................................................................................... 27|
|Componente de Impacto .................................................................................... 27|
|Reducción de la Incertidumbre y Precisión Proactiva ............................................ 28|
|Precisión de las Alertas de Riesgo (Impacto Técnico) ......................................... 28|
|Reducción de la Incertidumbre Ciudadana (Impacto Social) .............................. 28|
|Resultado Final Esperado ................................................................................ 29|



### Introduccion 

En el contexto actual de Nicaragua, la seguridad ciudadana demanda herramientas tecnológicas que no solo registren hechos, sino que permitan anticiparse a ellos. Este proyecto presenta un sistema de información basado en Inteligencia Artificial diseñado para la **predicción delictiva** . Entendemos la predicción delictiva como una **ciencia aplicada** que utiliza algoritmos de aprendizaje automático para analizar datos históricos y detectar probabilidades de incidencia criminal en zonas y momentos específicos. 

El sistema está diseñado para ser una herramienta operativa que funcione bajo el estricto cumplimiento de las **leyes y normativas de la Policía Nacional de Nicaragua** , garantizando que la tecnología sirva como un brazo preventivo eficiente para la protección de las familias y comunidades. 

### Relevancia 

**Impacto Tecnológico:** Este sistema introduce en el país una arquitectura de software capaz de procesar grandes volúmenes de datos con fines preventivos, suministrando de herramientas tecnológicas disponibles para la seguridad pública en el ámbito local. 

### Antecedentes 

La seguridad publica enfrenta en la actualidad riesgos complejos dese o que es el robo con intimidacion hasta violencia armada en zonas urbanas. Con esto peligros se genera una sensacion de inseguridad que puede afectar la movilidad y calidad de vida de los ciudadanos. 

El pais de Nicaragua no es una excepcion a estos peligros que atentan la seguridad y a nivel nacional, el comportamiento delictivo en puede presentar patrones geográficos específicos que pueden dar paso a la justificacion de la implementación de un software de análisis predictivos de delitos. 

Tomando de referencia un informe de la Policía Nacional de Nicaragua realizado en el año 2024, aunque se registró una disminución general de la actividad delictiva en comparación con el año 2023, departamentos como Managua, Jinotega y Matagalpa continúan concentrando la mayor cantidad de muertes homicidas y robos con intimidación (asaltos). En 2023, se reportaron 2,495 casos de robos con intimidación, evidenciando una oportunidad para que sistemas de información basados en IA identifiquen puntos calientes o zonas de riesgo para el ciudadano nicaragüense. 

Segun el anuario estadistico de la Policia Nacional de Nicaragua el departamento de Masaya tambien es una zona de alta relevancia, registrando un buena cantidad de casos de denuncia estos con una concentradicion de incidentes en la via la publica y viviendas especialmente en los fines de semana en sectores urbanos. 

Para la realizar la fundamentacion de la documentacion pertinente para este protocolo se requirio la investigacion de sistemas existentes que se hayan creado con relacion a la seguridad ciudadana para el analisis de funciones o caracteristicas que aporten una base de referencia para este protocolo dichos sistemas son los siguientes: 

##### 1. Sistema PredPol 

Uno de los referentes globales más significativos es el desarrollo del sistema PredPol este fue proyecto realizado por el Departamento de Policias de los Angeles (LAPD) y la Universidad de California, analizado por Mohler et al. (2015) en Estados Unidos. Este sistema se desarrollo con el objetivo optimizar la distribución del patrullaje policial mediante la predicción de "puntos calientes" de criminalidad. 

Predpol no utiliza una IA es decir no utiliza una red neuronal esta utiliza algoritmos de procesos de puntos estocásticos, los cuales estaban originalmente diseñados para predecir réplicas de terremotos, pero aplicándolos a la criminología. 

En el ámbito regional, Martínez (2021) desarrolló una investigación en la UNAM donde implementó modelos de Deep Learning para identificar patrones de riesgo en Ciudad de México. El estudio utilizó redes neuronales recurrentes (RNN) para procesar variables socioeconómicas y registros policiales. Los resultados indicaron que la inclusión de variables no convencionales (como el alumbrado público o el clima) mejora la precisión del sistema en un 12%. Esta investigación aporta a la presente 

monografía la importancia de la selección de variables externas para nutrir la eficacia de un sistema de información con IA. 

A pesar de la existencia de sistemas avanzados de gestión de datos, la mayoría de estas herramientas están diseñadas exclusivamente para el uso interno de las instituciones policiales. Estas plataformas priorizan la operatividad táctica y el archivo de expedientes, limitando el acceso de la información estratégica al público general. Esta restricción genera una brecha de información donde el ciudadano común carece de recursos visuales para identificar los peligros en su entorno cercano. 

La propuesta de este proyecto monografico se diferencia al enfocarse en la visualización dinámica orientada al ciudadano final mediante el uso de mapas de calor accesibles desde la web. A diferencia de los sistemas tradicionales, este proyecto busca democratizar el acceso a los datos delictivos verídicos del departamento de Masaya de manera intuitiva. Al transformar estadísticas complejas en representaciones gráficas de riesgo, se empodera al usuario para que pueda tomar decisiones preventivas e informadas en su vida cotidiana. 

##### Mapa de Delitos (Buenos Aires, Argentina): 

El Mapa del Delito de Buenos Aires se implementó para resolver la opacidad en las estadísticas criminales y la falta de información geográfica accesible para el ciudadano segun el Ministrio de Seguridad Buenos Aires (2021). Mediante el uso de Sistemas de Información Geográfica (SIG) y bases de datos integradas, el software procesa denuncias reales para generar visualizaciones de densidad delictiva. Esta tecnología permite que la población identifique con precisión las zonas de mayor riesgo en su entorno urbano sin depender de análisis policiales internos. 

### Objetivo general 

Desarrollar un sistema de información basado en algoritmos de Machine Learning para la predicción de zonas de riesgo y generación de alertas de seguridad ciudadana de manera oportuna, con base de datos históricos y contextuales de una zona especifica 

### Objetivo Específico 

1. **Analizar, recopilar y depurar fuentes de datos relevantes** : Realizar la recopilación, análisis e integración de datos históricos delictivos y variables climatológicas 

2. **Diseñar, entrenar y validar un modelo de Machine Learning:** Desarrollar y evaluar un modelo de aprendizaje supervisado capaz de identificar patrones de riesgo y generar predicciones con un nivel de precisión adecuado para su uso 

3. **Desarrollar una arquitectura de software:** Construir una API funcional utilizando FastAPI para gestionar la comunicación entre el modelo de Machine Learning, las fuentes de datos y la interfaz de usuario 

4. **Implementar una interfaz de visualización dinámica** 

5. Diseñar e integrar una interfaz basada en mapas de calor que permita visualizar predicciones de riesgo, rutas seguras y zonas críticas de manera clara e intuitiva para los usuarios finales 

6. **Evaluar el rendimiento del sistema** Medir el desempeño del modelo del sistema mediante metricas con Precision, Recall y F1-Score, determinando la viabilidad del prototipo para futuros desarrollos a mayor escala 

### Pregunta de Investigacion 

¿Cómo puede un sistema de información basado en Inteligencia Artificial predecir patrones delictivos de manera efectiva,para fortalecer la prevención del crimen en el país? 

### Alcance 

El alcance de este proyecto se limita al análisis de una zona geográfica especifica definida inicialmente como un radio aproximado de 5 kilómetros en una zona determinada. El estudio se centrarán delitos comunes como robos de celular y hurtos a peatones debido a su frecuencia a las disponibilidades de datos históricos para el entrenamiento del modelo. Tecnológicamente, el alcance incluye el desarrollo de una API Backend funcional y un prototipo de aplicación web que permita visualizar la información procesada por el sistema. El proyecto utilizara datos históricos de los últimos dos o tres años, complementados con datos climáticos obtenidos de APIs abiertas en tiempo real, con el fin de alimentas los modelos predictivos de manera consistentes. 

### Justificación 

La implementación de este sistema se justifica por la urgente necesidad de pasar de un modelo de seguridad reactivo a uno basado en la inteligencia preventiva. 

- **Alineación Legal y Ética:** Una de las mayores justificaciones de este proyecto es su diseño basado en las leyes de Nicaragua. El sistema respeta el debido proceso y la privacidad de los datos según la normativa de la Policía Nacional, asegurando 

que las predicciones sean utilizadas como inteligencia estratégica legítima para la seguridad ciudadana. 

- **Impacto en la Seguridad Ciudadana:** Al predecir el comportamiento delictivo de individuos con antecedentes o de grupos criminales, se logra una reducción directa en la tasa de criminalidad. Esto genera un entorno de mayor confianza para la población nicaragüense, permitiendo un desarrollo social más estable y seguro, donde la tecnología actúa como un escudo protector fundamentado en la ciencia de datos. 

### Marco Metodologico 

Para el desarrollo del sistema de prediccion y monitoreo de riesgos de seguridad publica, se ha seleccionado la metodologia agil SCRUM. Esta eleccion se justifica por la naturaleza iterativa del proyecto, especialmente en las etapas de entrenamiento del modelo de machine Learning y el ajuste de los mapas de calor, donde el feedback constante y la capacidad de respuestas al cambio son fundamentales para alcanzar la precision deseada. 

A diferencia de los modelos tradicionales en cascada, SCRUM permite dividir el desarrollo en ciclos de trabajo denominados Sprint. Segun Pressman(2010), este enfoque facilita la entrega temprana de software funcional. Para este proyecto esto siginifca que no esperaremos al final para ver el mapa, podremos validar la API en FastAPI mientras el modelo de IA se sigue perfeccionando en paralelo 

#### Adaptacion de SCRUM al ciclo de Vida de la Inteligencia Artificial 

La implementacion de metodologias agiles en proyectos de inteligencia Artificial presenta desafios unicos debidos a la incertidumbre en los resultados de los modelos. Por ello, este proyecto adapta los eventos de SCRUM para alinearlos con las fases de Ciencia De Dato: 

- Sprint de Exploracion de Datos: En las primeras iteraciones, el objetivo del Sprint no sera una funcionalidad de usuario, sino la validacion de la hipotesis de datos. Esto incluye la limpieza y normalizacion de los registros delictivos y climaticos. 

- Refinamiento del Backlog basado en Metricas: A diferencia de un sistema transaccional, el Product Backlog se reordenara segun los resultados de las metricas de Precision, Recall y F1-Score. Si un modelo no alcanza el umbral de precision definido en el alcance, el siguiente Sprint se enfocara en el reentrenamiento o ajuste de hiperparametros. 

- Incrementos de Modelo vs Incrementos de Software: se define un “incremento” como una version del modelo que mejora la capacidad predictiva repsecto a la anterior. el objetivo final es integrar estos incrementos a una API funcional construida con FastAPI 

Dado que el proyecto utiliza datos historicos de los ultimos 2 o 3 años, la metodologia permitira gestionar la “deuda de datos”. Si la fuente informacion presenta incosistencias, el equipo utilizara la Retrospectiva del Sprint para ajustar las variables externas (como el alumbrado o el clima) y mejorar la eficacia del sistema en un entorno urbano 

#### Tabla de Roles 

|**Rol**|**Responsabilidad Principal**|
|---|---|
|**Product Owner**|Es el responsable de maximizar el valor del producto. En tu<br>caso, prioriza qué delitos o zonas de Managua se analizan<br>primero y valida que los resultados sean útiles para la seguridad<br>ciudadana.|
|**Scrum Master**|Es el líder que sirve al equipo y al proceso. Se asegura de que el<br>equipo no se detenga por problemas técnicos (ej. falta de<br>acceso a un dataset) yfacilita las reuniones.|
|**Developers**|Son las personas del Scrum Team que se comprometen a crear<br>cualquier aspecto de un Incremento utilizable en cada Sprint.<br>Aquí entran tú y tus dos compañeros como programadores,<br>analistas de datosyexpertos en IA.|



|**Rol Scrum**|**Especialidad**<br>**Técnica**|**Integrante**|**Responsabilidades en el Proyecto**|
|---|---|---|---|
|**Product**<br>**Owner**|**Lead**<br>**Developer**|**Sergio**<br>**Matamoros**|Definir la visión del producto y<br>priorizar el_Product Backlog_. Liderar el<br>diseño de la arquitectura de la IA y<br>asegurar el cumplimiento de las<br>métricas deprecisión.|
|**Scrum**<br>**Master**|**Data**<br>**Developer**|**Juan Perez**|Facilitar la metodología y eliminar<br>impedimentos técnicos . Responsable<br>de la extracción y depuración de datos<br>históricosyclimáticos.|
|**Developer**|**Backend**<br>**Developer**|**Ernesto**<br>**Martinez**|Construir la API con**FastAPI**para<br>conectar el modelo de IA con el<br>usuario. Implementar la interfaz de<br>mapas de calorylas rutas seguras.|



### Descripcion de las Fases de SCRUM aplicadas en el proyecto 

El desarrollo del sistema se estructurara en ciclos iterativos (Sprint), organizados en fases logicas que aseguran la transicion desde la ingesta de datos hasta el despliegue del modelo predicitivo. 

#### Fase de Inicio: Arquitectura de Datos e Ingesta Historica 

El exito del a capacidad predictiva del sistema radica en la integridad de los insumos, por lo que esta fase se centra en la tansformacion de registros heterogeneos en un dataset estructurado. Se implementaran procesos de extaccion automatizada mediante el uso de librerias como Comelot-py para procesar las tablas estadisticas de los anuarios de la Policia Nacional, integrando simultaneamente datos climaticos historicos a traves de la API de Visual Crossing. Debido a la naturaleza cualitativa de las direcciones en los registros locales, se aplicaran algoritmos de Fuzzy Matching para estandarizar la nomenclatura de los barrios de masaya y tecnicas de geocodificacion mediante GeoPy para asignar coordenadas de latitud y longitud precisas. El resultado final de esta fase es la consolidacion de un repositorio geoespacial en formato GeoJSON o postGis, donde cada incidente cuanta con variables normalizadas de tiempo, clima y ubicacion, eliminando sesgos por datos duplicados o incompletos 

#### Fase 2: Desarrollo del Motor de Inferencia y Orquestacion Asincrona 

Una vez consolidada la base de conocimiento, la fase de implementacion tecnica se enfoca en la construccion del nucleo de inteligencia y la infraestructura de servicos. Se diseñara un pipeline de aprendizaje supervisado utilizando Scikit-learn o XGBoost, donde la seleccion del modelo final se basara en una busqueda sistematica de hiperparametros para optimizar las metricas granmtizando un equilibrio robusto entre la deteccion de zonas de riesgo y la reduccion de falsas alarmas. para la exposicion de este modelo, se desarrollara un backend de alto rendimiento bajo el framework FastAPI, aprovechando su naturaleza asincrona para gestionar multiples consultas concurrentes de usuarios sin bloquear el hilo principal de ejecucion. La integridad de la comunicacion entre la interfaz y el motor de IA se asegurara mediante modelos de datos de Pydantic, los cuales validaran estrictamente los tipos de datos geograficos y climaticos antes de realizar cualquier proceso de inferencia en tiempo real. 

#### Fase 3: Capa de Visualizacion Dinamica y Optimizacion de Rutas 

La fase 3 del proyecto traduce la complejidad de los modelos matematicos en una herramienta de decision visualmente interpretable y eficiente para el ciudadano. Se integrara una interfaz dinamica utilizand librerias de renderizado cartografico como Leaflet.js o Mapbox GJ JS, encargadas de transformar las probabilidades de riesgo obtenidas de las API en capas de calor dinamicas mediante algoritmos de densidad de Kernel. Mas alla de la bisualizacion, el sistema implementara una logica de sugerencia 

de trayectoria que consumira datos de OpenStreetMap para calcular rutas que minimicen la exposicion a nodos de alta peligrosidad identificados por la IA. La eficacia de esta etapa se validara medainte pruebas de altencia y arga, asegurando que el renderizado de la informacion geoespacial en el entorno urbano de Masaya se realice en tiempos inferiores a los 2 segundos, proporcionado una herramienta de monitoreo reactiva y confiable para la movilidad urbana 

#### Fase 4: Evaluacion de integridad y ciclo de retroalimentacion Agil 

Para garantizar que el sistema no solo sea funcional, sino confiable en un entorno de seguridad real, se implementara una fase de validacion tecnica y operativa. Esto incluye la ejecucion de pruebas de integracion entre el motor de FastAPI y el modelo de inferencia, asegurando que la serializacion de los datos climaticos y delictivos no introduzca latencias superiores a los umbrales aceptables. Bajo la metodologia SCRUM, cada incremento sera sometido a una revision de metricas de desempeño donse se contrastaran las prediucciones del modelo con un conjunto de datos de prueba (TEST SET) no visto durante el entrenamiento, calculando la matriz de confusion para minimizar los falsos negativos en zonas de alta peligrosidad. Finalmente ser realizaran sesiones de demostracion tecnica para validar la usabilidad de la interfaz en dispositivos moviles, asegurando que la interpretacion de los mapas de calor sea inmediata y que la logica de ruteo en masaya responda de manera coherente a la red vial local, cerrando asi el ciclo de desarrollo con un producto verificado y listo para su implementacion documental 

### Marco Teorico 

En esta seccion se establecen los fundamentos tecnicos y cientificos que sustentan el desarrollo del sistema predictivo. A diferencia de un glosario, este marco justifica el uso de cada tecnologia en funcion de la eficacia operativa del proyecto 

#### Metodologia de Desarrollo Agil: SCRUM 

Scrum es un marco de trabajo robusto basado en procesos iterativos e incrementales diseñado para el desarrollo de productos complejos. Esta metodologia se fundamenta en la teoria de control de procesos empiricos, apoyandose en los pilares de transparencia, inspeccion y adaptacion. A traves de ciclos de trabajo denominados Sprint, permite una entrega continua de valor, facilitando la integracion de cambios en los requerimientos mediante la colaboracion constante entre el equipo de desarrollo y los interesados. Los roles definidos en este marco (Product Owner, Scrum Master y Equipo de Desarrollo) asegurando una gestion clara de las responsabilidades y una autoorganizacion eficiente del flujo de trabajo 

#### Tecnologias de Backend y Orquestacion 

## **Framework de Alto Rendimiento: FastAPi** 

FastAPI se define como un framework web moderno y de alto rendimiento para la construccion de APIs con Python, basado en las especificaciones estandar de JSON Schema y openAPI. A diferencia de frameworks tradicionales como Django o Flask, FastAPI esta construido sobre Starlette para las piezas web y Pydantic para la validacion de datos. Su principal ventaja competitiva radica en el uso de la interfaz de puerta de enlace de servidor asincrono (ASGI), lo que le permite gestionar multiples conexiones de forma concurrente bajo un solo hilo de ejecucion, optimizando drasticamente el uso de recursos del servidor durante la consulta de modelos de aprendizaje automatico. 

La capacidad fundamental que justifica la implementacion de FastAPI en este sistema es su soporte nativo para la programacion asincrona mediante las palabras claves async y await. En un sistema de prediccion delictiva, el backend debe realizar tareas intensivas, como la consulta a la base de datos postGIS y la ejecucion de iferencias en el modelo de inteligencia artificial. En un entorno sincrono, cada peticion bloquearia el servidor hasta el modelo termine de precoesar la respuesta, sin embargo la naturaleza asincrona de FastAPI permite que el servidor continue recibiendo y procesando otras solicitudes de monitoreo mientras el motor de IA calcula los mapas de calor en segundo plano 

Ademas de su velocidad de ejecucion, que es comparable a lenguajes como Go o Node.JS, FastAPI garantiza la integridad del sistema a traves del tipado estatico de Python. Al utilizar declaraciones de tipo, el framework realiza una validacion automatica de los datos de entrada antes de que lleguen a la logica del modelo, reduciendo errores en tiempo de ejecucion y facilitando el mantenimiento del codigo. Esta robustez tecnica, sumada a la generacion automatica de documentacion interactiva bajo el estandar Swagger UI, permite una integracion tranaparente con el frontend en React, asegurando que la comunicacion entre la interfaz de usuario y el motor de prediccion sea eficiente, segura y escalabel para las demandas de seguridad publica 

## **Diseño de la Arquitectura del Sistema** 

La arquitectura del sistema se basa en un modeloi de Microservicios Desacoplados, donde cada capa operativa funciona de manera independiente pero integrada a traves de protocolos de comunicacion definidos. El nucleo de esta estructura reside en el backend desarrollado con FastAPI, el cual actua como un orquestador central que gestiona las peticiones provenientes del cliente y coordina la ejecucion de procesos criticos. Esta separacion permite que el sistema sea escalable, facilitando que el procesamiento intensivo de datos espaciales en el motor de inteligencia artificial no interfiera con la capacidad de respuesta de la interfaz de usuario, garantizando asi una experiencia de navegacion fluida y de alta disponibilidad. 

La comunicacion entre el FrontEnd desarrollado en React y el servidor se realiza mediante el estandar RESTful API, utilizando el formato JSON para el intercambio de datos. Cuando un usuario interactua con el mapa interactivo, la interfaz envia solicitudes asincronas hacia los endpoints del backend, los cuales validan la informacion de entrada mediante esquemas de Pydantic. Posteriormente, el backend invoca al Motor de IA y consulta la base de datos PostGIS de forma concurrente, el modelo predictivo procesa la variables temporales y geograficas para devolver un vector de riesgo que el servidor transforma en capas de calor dinamicas, enviandolas de regreso al cliente para su renderizacion inmediato en Leaflet.js. 

Finalmente, la arquitectura integra un flujo de persistencia robusto donde el motor de inteligencia artificial no solo consume datos historicos, sino que se mantiene en constante comunicacion con el sistema de gestion de bases de datos objeto-relacional PostgreSQL. Esta capa de datos esta optimizada para el manejo de tipos geometricos complejos, permitiendo que el motor de IA realice operaciones de interseccion y densidad de puntos de forma eficiente. El resultado es un ecosistema tecnico donde la visualizacion de datos, la logica de negocio y la inferencia predictiva operan en un ciclo cerrado, permitiendo que el sistema de monitoreo de riesgos de seguridad publica funcione como una solucion integral y proactiva. 



<!-- Start of picture text -->
Capa Superior - Frontend<br>React.js<br>+<br>- Leaflet.js<br>peticiodn HTTP respuesta GeoJSON mapa decalor — solicitud<br>aga Media - Backend \<br>FastAPI<br>API Gateway<br>Async/Await<br>consulta async datos geograficos consulta async _ prediccion de riesgo<br>Capa Inferior - Dates Capa Inteligencia -<br>PostgreSQL Modelo ML<br>A Python<br>PostGIS PrediccionScikit-Learn- ose de Riesgo.<br><!-- End of picture text -->

##### **_GET /prediccion/riesgo_** 

Endpoint encargado de servir los datos necesarios para el renderizado de densidades de Kernel en Leaflet.js . Filtra la informacion segun parametros temporales (dia, hora) y climaticos para que la interfaz muestre la concentracion de riesgos de manera visual 

#### **Servicios de Inferencia y Pedriccion** 

##### **_POST /prediccion/riesgo_** 

Es el servicio principal que conecta con el motor de Machine Learning. Recibe un objeto JSON con variables actuales (coordenada, hora, clima en tiempo real), y tras la validacion con Pydantic, devuelve un nivel probabilistico de riesgo delictivo basado en el modelo entrenado 

##### **_POST /ruta-segura/calcular_** 

Este endpoint interga la logica de prediccion con la red vial de OpenStreetMap. Recibe un punto de origen y un destino, procesa los nodos de alta peligrosidad identificados por la IA y devuelve una trayectoria sugerida que minimiza la exposicion del ciudadano a zonas criticas 

#### **Servicio de Utilidad y Salud del sistema** 

##### **_GET /health_** 

Un endpoint de verificacion simple que confirma el eestado operativo de la conexion entre FastAPI, la base de datos PostgreSQL y el motor de inferencia de IA 

##### **_GET /matedata/clima_** 

Servicio que actua como proxy para obtener datos climaticos actuales desde la API externa (Visual Crossing) y los pone a disposicion del frontend y el motor de prediccion 

#### **Servicios de Interaccion Ciudadana** 

##### **_POST /incidentes/reportar_** 

Permite que los ciudadanos envien reportes en tiempo real sobre situaciones sospechosas o delitos menores detectados en el radio. Estos datos, una vez validados, sirven para retroalimentar el modelo de IA en futuros re-entrenamientos. 

##### **_GET /zonas/nombres_** 

Un servicio sencillo para poblar listas desplegables en el frontend con los nombres de los barrios o sectores de Masaya 

#### **Servicios de Transparencia y Metricas** 

##### **_GET /metricas/modelo_** 

Expone el rendimiento actual del motor IA. esto es vital ya que permite demostrar en vivo que el sistema es confiable y transparente con sus margees de error. 

##### **_GET /estadisticas/historicas_** 

Porporciona datos agregados (conteo de delitos por mes) para generar graficas de barras o pasteles en el dashboats, complemetando el mapa de calor. 

#### Tecnologia de FrontEnd 

#### Biblioteca React.JS 

React.JS es una biblioteca de JavaScript de codigo abierto, desarrollada por Meta, orientada a la creacion de interfaces de usuario basadas en componentes. Su arquitectura se fundamenta en el uso de un Virtual DOM, una representacion en memoria de la interfaz real que permite optimizar las actualizaciones de la vista al renderiziar unicamente los elemtos que han sufrido cambios en su estado. Segun Fedosejev (2015), esta eficiencia es fundamental en aplicaciones de alta interactividad, permitiendo una experiencia de usuario fluida y reactva. 

Su enfoque declarativo y basado en componentes facilita el mantenimiento del codigo y la reutilizacion de elementos logicos en la interfaz. 

#### Biblioteca Leaflet.JS 

Es una biblioteca de JavaScript especializada en la implementacion de mapas interactivos ligeros y optimizados para entornos web y moviles. Se caracteriza por su alta extensibildad mediante complementops permitiendo la integracion de capas de calor dinamicas y marcadores geoespaciales sobre la cartografia de OpenStreetmap. 

En conjunto con React, a traves de implementaciones como react-;leaflet, permite que los datos provenientes del motor de inteligencia artificial se visualicen de forma geoespacial, transformando coordenadas numericas en representaciones visuales de riesgo delictivo en la ciudad de Masaya 

##### **Capas de Teselas (Tile Layers)** 

El sistema utiliza **Tile Layers** para estructurar la base visual del mapa. Estas capas permiten: 

- **Fragmentación de Datos:** El mapa se divide en pequeñas imágenes (teselas) que se cargan a demanda, optimizando el ancho de banda y permitiendo que el software funcione incluso en condiciones de conectividad limitada en el territorio nacional. 

- **Contextualización Legal:** Permite superponer mapas oficiales de la división política y administrativa de Nicaragua, asegurando que las predicciones se ubiquen correctamente dentro de las jurisdicciones legales correspondientes. 

##### **Renderizado de Mapas de Calor (Heatmaps)** 

Para cumplir con el propósito de predecir el crimen de manera efectiva, el sistema implementa **Mapas de Calor** . Esta técnica de visualización es vital para el funcionamiento del software por las siguientes razones: 

- **Densidad Probabilística:** El renderizado de mapas de calor transforma los datos abstractos de la IA en una representación visual de intensidad. Las zonas con mayor coloración indican una probabilidad más alta de incidencia delictiva, permitiendo una interpretación inmediata de los puntos críticos. 

- **Identificación de Patrones:** Mediante algoritmos de interpolación, el mapa de calor permite visualizar no solo el punto exacto de un posible delito, sino la zona de influencia de una persona con antecedentes o un grupo delictivo, fundamentando la toma de decisiones preventivas basada en evidencia científica y visual. 

### inteligencia Artificial y Aprendizaje Supervisado 

#### Inteligencia Artificial 

la Inteligencia Artificial se define como el campo de la ciencia de la cmputacion dedicado al desarrollo de sistemas capaces de realizar yareas que, habitualmente, 

requieren de la inteligencia humana, tales como la percepcion visual, el reconocimiento de patrones y la toma de decisiones segunm Rusell y Norvig (2021), la IA moderna se centra en el diseño de agentes inteliogentes que perciben su entorno y ejecutan acciones que maximizan sus posibilidades de exito. En la ingenieria de software actual, la IA permite que los sistemas pasen de ser herramientas reactivas a soluciones proactivas capaces de procesar grandes volumenes de adtos geoespeciales para identificar anomalias 

##### **_Aprendizaje Supervisado_** 

El aprendizaje supervisado es una subcategoria del Machine Learning que consiste en el entrenamiento de un modelo algoritmico a partir de un conjunto de datos previamente etiquetados, denominados datos d eentrenamiento. En este paradigma, cada registro de entrada cuenta con una repuesta o etiqueta de salida conocida (gorund truth). de Acuerdo con Geron (2019), el objetivo fundamental es que el modelo aprenda una funcion de mapeo que le permita predecir, la etiqueta de salida para nuevos datos no vistos previamente. Esta metodologia es esencial para la etiqueta de salida para nuevos datos no vistos previamente. 

#### Algoritmos de Clasificacion y bosques Aleatorios 

Dentro del aprendizaje supervisado, los algoritmos de clasificacion son aquellos que asignan una categoria o etiqueta a una entrada especifica. El algoritmo es una tecnica que opera medainte la construccion de multiples arboles de decision durante el entrenamiento. Segun Hastie el al. (2009), este metodo destaca por su robustez y su capacidad para manejar relaciones no lineales en los datos, reduciendo el riesgo de sobreajuste. 

### Sistema de Gestion de Bases de Datos 

#### PostgreSQL 

PostgreSQL es un sistema de gestión de bases de datos objeto-relacionales (ORDBMS) basado en PostgreSQL, versión 4.21, desarrollado en el Departamento de Informática de la Universidad de California en Berkeley. (PostgreSQL Global Development Group, 2026) 

PostgreSQL combina las características de las bases de datos relacionales tradicionales con las capacidades de las bases de datos orientadas a objetos, permitiendo la definición de tipos de datos complejos y herencia. Es un proyecto de código abierto mantenido por el PostgreSQL Global Development Group. 

Sus Caracteristicas Fundamentales y capacidades son las siguiente: 

**Extensibilidad:** Es una de sus características principales, permitiendo a los usuarios añadir nuevos tipos de datos, funciones personalizadas, operadores y métodos de acceso. 

**Concurrencia:** Utiliza el Control de Concurrencia Multiversión ( **MVCC** ), lo que permite que múltiples procesos accedan a los datos simultáneamente sin necesidad de bloqueos de lectura/escritura en la mayoría de los casos. 

**Integridad de Datos:** Implementa restricciones de integridad (como claves foráneas y restricciones de control), transacciones seguras (cumplimiento ACID) y disparadores ( _triggers_ ) para garantizar la consistencia de la información. 

**Tipos de Datos Avanzados:** Además de los tipos numéricos y de texto estándar, soporta de forma nativa JSON (JSONB), XML, arreglos, tipos geométricos y direcciones de red. 

##### **Arquitectura y Almacenamiento** 

La Arquitectura de PostgreSQL se base en una de Cliente/Servidor 

**Proceso Backend:** El servidor PostgreSQL gestiona los archivos de la base de datos, acepta conexiones de aplicaciones clientes y realiza acciones en la base de datos en nombre de estas. 

**Layout Físico (PGDATA):** Los archivos de datos se organizan físicamente en un directorio de datos común llamado `PGDATA` , que contiene subdirectorios para las bases de datos, registros de transacciones (WAL) y archivos de configuración como `postgresql.conf` y `pg_hba.conf` . 

**Write-Ahead Log (WAL):** Implementa un registro de escritura anticipada para asegurar la fiabilidad; los cambios se escriben en el registro antes de aplicarse a los archivos de datos, permitiendo la recuperación tras fallos. 

##### **Limitaciones** 

Para efectos de diseño, PostgreSQL establece límites máximos de capacidad que garantizan su operatividad: 

##### **Tamaño de la base de datos:** Ilimitado 

##### **Tamaño máximo de una tabla:** 32 TB 

**Columnas por tabla:** Entre 250 y 1,600 (dependiendo de los tipos de datos) 

**Longitud de identificadores:** 63 bytes por defecto. 

#### Extension PostGis 

Esta es una extension de PostGreSQL que permite lo que es la interaccion con datos geograficos dentrode PostGreSQL.Supabase (s.f.) Dicho de otra forma PostGIS añade soporte para objetos geográficos a PostgreSQL, permitiendo ejecutar consultas de ubicación mediante el lenguaje SQL. PostGIS incluso permite realizar operaciones espaciales potentes, como calcular distancias, medir áreas, realizar uniones espaciales, etc. Esto lo hace ideal para aplicaciones en cartografía, sistemas de información geográfica (SIG) y análisis geoespacial. (Butler, 2025). 

Esto se debe a que segun la documentacion oficial PostGreSQL puede ser “ampliado de muchas maneras para satisfacer las necesodades del usuario”(PostgreSQL Global Development Group, 2026) esto es lo que permite que PostGis registre y almacene nuevos tipos de datos, funciones y operadores de indice para geometria. 

##### **EL almacenamiento de Objetos Geograficos con la extension PostGis** En 

PostgreSQL, PostGIS almacena la información utilizando principalmente dos tipos de datos: `GEOMETRY` (para proyecciones planas) y `GEOGRAPHY` (para cálculos sobre la curvatura de la tierra). Los objetos se almacenan internamente en un formato binario conocido como **WKB** ( _Well-Known Binary_ ), aunque para la interacción humana se utiliza el formato **WKT** ( _Well-Known Text_ ). 

##### Puntos: 

Representan una ubicación única en el mapa, definida por un par de coordenadas (X, Y) o (Longitud, Latitud). En tu sistema para Masaya, cada incidente delictivo se almacena como un punto exacto. 

##### **Representación WKT:** `POINT(-86.0942 11.9744)` 

**Uso técnico:** "Un punto es un objeto geométrico de cero dimensiones que representa una ubicación única en el espacio coordinado" (PostgreSQL Global Development Group, 2026). 

##### Poligonos: 

Se utilizan para delimitar áreas geográficas, como los límites de un barrio o municipio en el departamento de Masaya. Se definen mediante una serie de puntos conectados que forman un anillo cerrado. 

**Representación WKT:** `POLYGON((-86.1 11.9, -86.0 11.9, -86.0 12.0, -86.1 12.0, -86.1 11.9))` 

**Uso técnico:** PostgreSQL permite que estos objetos complejos mantengan la integridad mediante "restricciones de control que restringen los valores permitidos" (PostgreSQL Global Development Group, 2026), asegurando, por ejemplo, que un polígono de un sector de Masaya no sea inválido por líneas que se cruzan a sí mismas. 

Indexacion Espacial: 

Para que la búsqueda de incidentes en una zona específica de Masaya sea rápida, PostGIS utiliza un tipo de índice especial soportado por el motor de PostgreSQL llamado **GiST** ( _Generalized Search Tree_ ). Como menciona la documentación: "PostgreSQL se puede ampliar para añadir nuevos... métodos de acceso" (PostgreSQL Global Development Group, 2026). En este caso, el índice GiST permite al sistema buscar delitos dentro de un polígono climático sin tener que revisar cada registro de la base de datos, optimizando el rendimiento del sistema de análisis delictivo. 

##### **Diseño del Modelo Entidad-Relación (DER):** 

El sistema se basara en tres creterios importantes los cuales seran los pilares para la recopilacion de datos los cuales son: El **Incidente Delictivo** , las **Variables Climáticas** y la **Ubicación Geográfica** . El incidente: Este sera el mas importante ocurre en una coordenada especifica y en un momento dado: 

Las variables climaticas: Se registra de forma periodica e hipoteticamente el sistema el sistema puede probar que el clima puede influir en la frecuencia de los incidentes. 

La ubicacion geografica: Estos son los que definiran los puntos de control en el departamento de Masaya y delimitara la zona designada. 

##### **Definicion de las tablas y los atributos** 

Tendriamos tres tablas entidad de acuerdo a nuestros tres criterios y con sus atributos los cuales seria las siguientes: 

Tabla A: Zona_Masaya 

Almacena la división geográfica o puntos de interés dentro del departamento. 

- Id_Zona: Id de la zona o punto de interes para la la visualizacion de riesgos 

- Nombre_barrio: nombre la zona o punto de interes 

- Geom: Tipo `GEOMETRY(Point, 4326)` . Almacena la coordenada exacta (Longitud/Latitud). 

##### Tabla B: Incidentes 



<!-- Start of picture text -->
fe[ese [oe[won|| [ essecone [secone [e [ [oe e<br>[<br>contiene influye<br>UO @<br>Y od<br>ie [mae [<br>ieee [oes |<br>eee<br><!-- End of picture text -->

> **[** essecone [secone [e [ [oe **e** mn|[ st [ sees | 

### Aseguramiento de Calidad (QA) y pruebas de software 

El aseguramiento de Calidad de Software se defina como el conjunto de actividades sistematicas y planificadas que se implementan dentro del ciclo de vida del desarrollo 

para garantizar que el producto final cumpla con los requisitos funcionales y estandares de rendimiento establecidos. Segun Pressman (2010), la estrategia de prueba de software debe integrarse desde las etapas tempranas para minimizar el impacto de errores tecnicos. 

#### Pruebas Unitarias 

Se enfocan en la verificacion de la unidad mas pequeña del diseño del software (componente o modulo). En este sistema, se aplicam para validar la logica individual de los algoritmos de preprocesamiento de datos y las rutas especificas de la API en FastAPI, asegurando que cada funcion retorne los valores esperados de forma aislada. 

#### Pruebas de Integracion 

Estas oruebas tienen como objetivo verificar la interaccion entre los diferentes modulos del sistema. Segun Smmerville (2011), se centran en detectar errores en las interfaces y en el flujo de datos. Para el proyecto, esto implica valoidar la correcta comunicacion entre el frontend de React, la base de datos y el motos de inferencia de inteligencia artificial 

#### Pruebas de Aceptacion 

Son pruebas de alto nivel dirigidas a validar que el sistema completo sitsface los requisitos del usuario y esta listo para su despliegue. Estas pruebas aseguran que la herramienta sea intuitiva 

## **Diseño de infraestructura y despliegue (Cloud Hosting)** 

Para garantizar que el sistema de monitoreo sea accesible de forma interrumpida, se ha diseñado una arquitectura de despliegue basada en el modelo de Plataforma como Servicio (PaaS). Esta estrategia permite el desacoplamiento de las capas del sistema, facilitando el mantenimiento independiente y garantizando que el motor de inteligencia artificial cuente con los recursos computacionales necesarios para realizar inferencias en tiempo real sin degradar la experiencia de usuario. 

#### Alojamiento del frontend (Vercel/ Netlify) 

La interfaz de usuario, desarrollada en React.JS sera desplegada en la plataforma Vercel. Esta eleccion se justifica por su red de entrega de contenidos (CDN) global, que 

permite tiempos de carga minimos para los mapas de Leaflet.JS. Ademas, vercel ofrece una integracion de trabajo de desarrollo, permitiendo despliegues automaticos que facilitan la fase de pruebas y garantizan que la capa de presentacion esta siempre sincronizada con las ultimas actualizaciones del sistema 

#### Alojamiento del Backend y Motor de IA (Render) 

El nucleo del sistema, que comprende la API en FastAPI y el motor de inferencia basado en Scikit-Learn, se alojara en Render. a diferencia de otros hosting compartidos, Render proporciona un entorno de ejecucion optimizado para contenedores y soporte nativo para python, lo cual es critico para gestionar las dependencias de ciencia de datos. Se ha seleccionado esta plataforma debido a su capacidad de escabilidad vertical, permitiendo asignar mayor memoria RAM al proceso cuando el modelo de IA debe procesar datasets de gran volumen o multiples solicitudes simultaneas de prediccion de riesgo. 

#### Persistencia de Datos (PostgreSQL en la nube) 

La base de datos PostgerSQL con la extension PostGIS se desplegara mediante una instancia gestionada que garantice la persistencia y la integridad referencial. El uso de una base de datos en la nube permite que tanto backend de desarrollo como el de produccion xonsuman la misma “fuente de verdad”. Se justifica esta eleccion por la necesdiad de ejecutar consultas espaciales complejas de forma rapida, asegurando que la geolocalizacion de incidentes se recupere con latencia minima 

### Marco Legal: Ley787 

Apoyar el protocolo del sistema en un marco legal es de vital importancia al manejar lo que son datos sensibles en este caso datos personales de victimas o criminales est debido tambien a los datos con los que trabajara el sistema y el entrenamiento de la IA este no es un simple requisito sino un cimiento que garantizara que el desarrollo tecnologico opere dentro de los limites eticos y el derecho. 

Al tratarse de datos sobre incidentes delectivos en el departamento de Masaya, este sistema asume la responsabilidad civil y social sobre informacion y datos que pueden vulnerar la seguridad de las personas si no se manejan de forma adecuada. Por lo tanto el marco legal actua como una ruta normativa que justifique la procedencia de datos y legitima su procesamiento automatizado mediante inteligencia artificial (IA). 

La Ley 787 es la ruta normativa a seguir por que su objetivo es principalmente proteger los derechos de las persona frente al tratamiemto de datos personales en entornos digitales y fisicos. Esta proporciona las directrices para asegurar que el almacenamiento en PostGreSQL y el entrenamiento de la intligencia artifical (IA) respete los marco legales a seguir para el tratameinto de datos sensibles de esta forma el sistema no solo sera tecnicamente efiente, sino tambien legalmente robusto y con respeto a la privacidad de los ciudadanos nicaraguense 

Los articulos a seguir de la Ley 787 considerados los mas importante a seguir para la robustez legal del sistema son los siguiente: 

#### Art. 5. Requisitos para la obtención de datos personales y Art. 6. Consentimiento 

El Artículo 5 da pie a la siguiente norma a seguir en la seguridad de los datos en el sistema, el tratamiento de datos personales solo es lícito cuando el titular da su consentimiento libre, específico e informado. Esto se aplicara con terminos claros donde el usuario acepte que su ubicacion y repote de incidente seran utilizados solo exclusivamente para fines de seguridad ciudadana. El articulo 6 menciona que los datos recolectados no sean utilizados para propositos distintos a los declarados inicialmente en el sistema. 

#### Art. 12. Seguridad y Art. 13. Confidencialidad de la Información 

El articulo 12 exige el uso y adopcion de medios de seguridad o medidad tecnicas necesarias para garantizar la seguridad de los datos y evitar su alteracion, perdida o acceso no autorizado esto se puede traducir como el cifrado de datos y la gestion de los roles de acceso restringidos y el articulo 13 insta a como profesional ya sea desarrollador o analista en casos de sistemas mantener en secreto los datos sensibles incluso al finalizar la relacion con el proyecto. 

### Seguridad y Proteccion de la informacion 

La robustez del sistema se garantiza mediante la implementacion de multiples capas de seguridad que protegen tanto la comunicacion entre los nodos como la integridad de la base de datos. Se han adoptado estandares de industria para asegurar que el intercambio de informacion sea privado y que el acceso a las funciones administrativoas este estrictamente regulado. 

#### Cifrado en Transito (SSL/TLS) 

Toda la comunicacion entre el cliente (React.JS) y el servidor (FastAPI) se realiza bajo el protocolo HTTPS, garantizando el cifrado de datos en transito mediante certificados 

SSL/TLS. Esta implementacion previene ataques de intermediario (Man-in-the-Middle), asegurando que las coordenadas geograficas de los usuarios y los reportes de incidentes viajen de forma cifrada. AL utilizar plataformas PaaS como render y Vercel, se garantiza la renovacion automatica de estos certificados, manteniendo el estandar de seguridad de forma interrumpida. 

#### Autenticacion y Autorizacion mediante JWT 

Para proteger las rutas criticas de la API, especialmente aquellas que perimtan la actualizacion de datos o el acceso a metricas sensibles, se utiliza el estandar JSON Web Tokens (JWT). Este mecanismo permite un a autenticacion sin estado (stateless), donde oel servidor emite un token firmado digitalmente tras validar las credenciales del administrador. Cada peticion a endpoints protegidos debe incluir este token en el encabezado de autorizacion, permitiendo al sistema verficar la identidad del emisor y sus permisos antes de ejecutar cualquier operacion en el motor de IA o en base de datos. 

#### **Validacion de Datos y Prevencion de Inyecciones.** 

La integridad del sistema frente a entradas maliciosas se asegura mediante el uso de Pydantic en el backend. FastAPI utiliza estos modelos de datos para realizar una validacion estricta de tipos y formatos antes de que cualquier informacion sea procesada por la logica de negocio. Este enfoque actua como una primera linea de defensa contra ataques de Inyeccion SQL, ya que todas las consultas a PostgreSQL/PostGIS se realizan mediante al mapeo de objetos o consultas parametrizadas, evitando la ejecucion de codigo arbitrario. Asimidmo, se implementan filtos de saneamiento en el fronten para prevenir ataques de Cross-Site Scripting (XSS) en la visualizacion de los mapas. en la visualizacion de los mapas 

### Marcos referenciales/antecedentes 

Para el marco referencial geografico del sistema el area de estudio y ejecucion de este protocolo se delimitara exclisivamente al municipio de Masaya, el municipio se ubica en la zna central del departamento. Esta delimitacion especifica es de vital importancia para el sistema ya que asi se podra realizar una prueba mas optimia del sistema y sencilla que al abarcar una gran cantidad de municipios del departamento de Masaya. De esta forma el trabajar con el uso de la extension PostGis en PostegreSQL se hara mas eficiente al poder realizar una malla de coordenada mucho mas especifica que facilite la correlacion entre las calles de la ciudad, el clima y la incidencia criminal reportada, 

De tal modo el marco referecencial del data set se realiza con informacion oficial y de libre acceso de dos vertientes que son las siguientes: 

1 Datos estadisticos oficiales de la Policia Nacional: Los datos historicos provienen del Anuario Estadistico de la Policia Nacional. este protocolo extrae específicamente los datos correspondientes al municipio de Masaya, permitiendo analizar la "Frecuencia de Horario" y la "Tipología" de delitos que ocurren en sus barrios y zonas comerciales (Policía Nacional de Nicaragua, 2022). Esto evita el sesgo de incluir datos de municipios rurales que no corresponden al comportamiento urbano de la ciudad de Masaya. 

2 Fuente de clima y datos libres: La recolección de variables climáticas se realiza mediante estaciones meteorológicas y repositorios de datos abiertos que tengan cobertura sobre el casco urbano de Masaya. Estos datos permiten que la IA identifique si factores como la temperatura promedio o las precipitaciones estacionales en la ciudad influyen directamente en la actividad delictiva registrada por las autoridades. 

### Contexto del Proyecto y Roles Organizacionales 

El sistema se fundamenta en un modelo de **Inteligencia Preventiva** , donde la tecnología actúa como un puente de comunicación estratégica. El flujo de información se divide principalmente en dos grandes pilares: la gestión oficial de los datos y la democratización de la información para el beneficio ciudadano. 

#### La Policía Nacional: Administrador Estratégico y Custodio de Datos 

La Policía Nacional de Nicaragua desempeña el rol de **proveedor y validador de la información primaria** . Su interacción con el sistema se define de la siguiente manera: 

- **Suministro de Inteligencia Histórica** : La institución genera los registros delictivos (anuarios y estadísticas de seguridad) que sirven como insumo base para entrenar el modelo de Machine Learning. 

- **Cumplimiento Legal y Ético** : Actúa como el marco regulador que asegura que el procesamiento de datos se realice bajo el estricto cumplimiento de las leyes nacionales y el respeto al debido proceso. 

- **Validación de Operatividad** : Aunque el sistema es preventivo y orientado al ciudadano, la Policía Nacional utiliza estos análisis para fortalecer su brazo preventivo en la protección de las familias y comunidades. 

#### 1.2 El Ciudadano: Usuario Final y Agente Participativo 

A diferencia de los sistemas tradicionales de uso interno policial, este proyecto coloca al ciudadano en el centro, transformándolo en un usuario activo de la tecnología. 

- **Consumo de Visualización Dinámica** : El ciudadano accede a la interfaz web para interpretar, de forma sencilla e intuitiva, los mapas de calor que indican zonas de riesgo en su entorno cercano, como el departamento de Masaya. 

- **Toma de Decisiones Preventivas** : Al comprender la probabilidad de incidencia criminal en horarios y lugares específicos, el usuario puede modificar sus hábitos de movilidad o utilizar la función de "ruta segura" para minimizar riesgos. 

- **Retroalimentación en Tiempo Real** : El ciudadano interactúa con el sistema reportando situaciones sospechosas o delitos menores a través de la plataforma, lo que genera un ciclo de retroalimentación que ayuda a re-entrenar y mejorar la precisión de la IA. 

##### **1.3 Dinámica de Interacción (Flujo de Información)** 

La interacción entre estos actores ocurre en un ciclo cerrado de beneficio mutuo: 

1. **Ingesta** : Los datos oficiales de la Policía y variables externas (clima) alimentan el motor de inferencia. 

2. **Transformación** : La Inteligencia Artificial procesa estas estadísticas complejas y las convierte en representaciones gráficas de fácil comprensión. 

3. **Acción** : El ciudadano consulta el mapa de calor, toma una decisión informada (como elegir una ruta más segura) y, opcionalmente, aporta nuevos datos mediante reportes. 

4. **Evolución** : Este flujo constante reduce la brecha de información, permitiendo que la sociedad pase de un modelo de seguridad reactivo (actuar después del delito) a uno proactivo y fundamentado en ciencia de datos. 

**Beneficio Clave** : Este rol organizacional democratiza el acceso a la seguridad, empoderando al usuario para identificar peligros en su entorno sin depender exclusivamente de análisis policiales internos. 

# Hipotesis 

En esta hipotesis se debe respaldar la relacion que tendran la entrada y tratamiento de datos y el resultado esperado dado que el modelo aprendera de datos historicos, el clima y el delito para proyectar sus predicciones. 

La implementación de un sistema de prediccion delictiva para el municipio de Masaya se fundamentara en la premisa de que la calidad multidimensional de los datos integrando la precisión geoespacial de la extension de PostGIS, la rigurosidad estadística del Anuario Policial y la variabilidad climática constituye el factor determinante para la eficacia del modelo. Se hipotetiza que el uso de algoritmos de aprendizaje supervisado permitirá al sistema identificar y extraer patrones de comportamiento criminal que no son evidentes a simple vista, estableciendo correlaciones estadísticas entre factores ambientales y la probabilidad de ocurrencia de delitos. 

Bajo este enfoque, se plantea que un dataset debidamente etiquetado y normalizado garantiza que el algoritmo aprenda de patrones reales e históricos, reduciendo el sesgo y aumentando la precisión de la respuesta. 

Desde una perspectiva de ingenieria, se asume que la efectividad de una solucion basada en inteligencia artificial no depende exclusivamente de la sofisticacion del algoritmo de aprendizaje, sino de la eficiencia sistematica de la arquitectura que soporta dicho modelo. La latencia en la transmision de datos, el bloqueo de procesos durante la inferencia y la falta de escalabilidad de los servidores suelen ser los principales cuellos de botellas que impiden que una prediccion teorica se convierta en ua alerta ciudadana reactiva. 

Bajo esta premisa, la investigacion postula que el exito del sistema radica en la sinergia entre el diseño arquitectonico y el procesamiento predictivo. Se propone que un entorno de ejecucion asincrono, capaz de manejar multiples peticiones concurretes, es el unico medio viable para garantizae que la visualizacion geoespacial de riesgos sea fluida y oportuna. Por lo tanto el planteamiento hipotetico que se presenta a coninuavion busca establecer una relacion de casualidad directa entre el uso de infraestructura elasstica en la nube y la optimizacion de la precision predictiva, asumiendo que la tecnologia no solo actua como un soporte, sino como el motor facilitador de una nueva estrategia de prevencion delictiva 

## Eficiencia y Accesibilidad 

El fundamento tecnico de la hipotesis descansa en la premisa de que la arquitectura asincrona de FastAPI, al operar sobre un bucle de eventos (Event Loop), permite que el sistema gestione multiples solicitudes de usuarios de manera concurrente sin bloquear el hilo principal de ejecucion mientra el motor de IA procesa la inferencia 

Desde la perspectiva del despliegue, el uso de infraestrucura en la nube(PaaS) garantiza que el sistema no este limitado por recursos locales, permitiendo una alta 

disponibilidad y una latencia minima en la entrega de datos. Bajo esta configuracion, se postula que 

“La implementacion de un backend asincrono basado en el estandar ASGI, en conjunto con un despliegue distribuido en plataforma de nube escaalbles, garantiza que el tiempo de respuesta para la generacion de mapas de riesgo esea menor a 2 segundos, asegurando que la informacion de seguridad sea accesible y reactiva para el ciudadano en condiciones de alta demanda de trafico.” 

### Componente de Impacto 

La implementación de este sistema de inteligencia artificial en el municipio de Masaya se fundamenta en la premisa de que la disponibilidad de alertas de riesgo de alta precisión actuará como un mecanismo mitigador de la percepción de inseguridad. Se hipotetiza que, al proporcionar información basada en evidencia científica que correlaciona el clima con la actividad delictiva, el sistema logrará una reducción significativa de la incertidumbre ciudadana. 

La hipótesis sostiene que la exactitud de las alertas generadas por el modelo no solo optimizará la vigilancia en puntos críticos del casco urbano de Masaya, sino que también fomentará el uso de la tecnologia para la prevención comunitaria, donde la capacidad de anticipar escenarios de riesgo reduzca la vulnerabilidad de los ciudadanos ante eventos delictivos condicionados por el entorno ambiental. 

### Reducción de la Incertidumbre y Precisión Proactiva 

Se plantea que la implementación de un sistema de información basado en algoritmos de **Machine Learning** y visualización dinámica permitirá transitar de un modelo de seguridad reactivo a uno preventivo, fundamentado en la ciencia de datos. El impacto esperado se desglosa en dos variables críticas: 

#### Precisión de las Alertas de Riesgo (Impacto Técnico) 

La hipótesis sostiene que, al procesar datos históricos delictivos de los últimos 2 a 3 años junto con variables climáticas en tiempo real, el sistema generará alertas de riesgo con un alto nivel de exactitud. 

- **Identificación de Patrones** : El uso de algoritmos como Bosques Aleatorios (Random Forest) permite manejar relaciones no lineales entre el clima, la hora y el lugar, logrando identificar "puntos calientes" con mayor precisión que los métodos estadísticos tradicionales. 

- **Optimización de Rutas** : Se espera que la integración con la red vial de OpenStreetMap permita al sistema sugerir trayectorias que reduzcan efectivamente la exposición del ciudadano a nodos de alta peligrosidad identificados por la IA. 

- **Reducción de Falsos Positivos** : Mediante el ajuste de hiperparámetros y la validación con métricas de Precision y Recall, el sistema minimizará las falsas alarmas, garantizando que las alertas sean operativamente útiles. 

#### Reducción de la Incertidumbre Ciudadana (Impacto Social) 

La hipótesis propone que la democratización del acceso a la información estratégica, mediante interfaces intuitivas, empodera al usuario y reduce su percepción de inseguridad. 

- **Visualización Dinámica** : Al transformar estadísticas complejas en mapas de calor accesibles vía web, el ciudadano deja de depender de análisis policiales internos para conocer su entorno. 

- **Decisiones Informadas** : Se espera que el acceso a datos verídicos del departamento de Masaya permita a los ciudadanos tomar medidas preventivas conscientes en su vida cotidiana, como evitar sectores críticos en horarios específicos. 

- **Transparencia y Confianza** : La exposición de métricas de rendimiento del modelo y la posibilidad de reportar incidentes en tiempo real fortalecerán la confianza del ciudadano en la tecnología como un escudo protector. 

#### Resultado Final Esperado 

"Si el sistema de información logra integrar con precisión variables espaciales y temporales mediante IA, entonces se logrará una **reducción directa en la tasa de incidencia criminal** y una **mejora significativa en la calidad de vida** de la población nicaragüense, al sustituir la incertidumbre por información estratégica de seguridad". 

