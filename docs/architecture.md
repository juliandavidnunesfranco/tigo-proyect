# Arquitectura Multi-tenant para TIGO CRM

## Visión General

El sistema TIGO CRM está diseñado como una aplicación multi-tenant donde cada tienda de TIGO representa un tenant independiente. La arquitectura sigue los principios de Clean Architecture y Domain-Driven Design (DDD) para garantizar la separación de responsabilidades, la escalabilidad y el mantenimiento a largo plazo.

## Estructura de Capas

### 1. Capa de Dominio (Domain Layer)

El núcleo de la aplicación que contiene:
- Entidades de dominio
- Agregados
- Value Objects
- Eventos de dominio
- Interfaces de repositorios
- Reglas de negocio

### 2. Capa de Aplicación (Application Layer)

Coordina las actividades de la aplicación:
- Casos de uso / Servicios de aplicación
- DTOs (Data Transfer Objects)
- Interfaces de servicios externos
- Manejo de eventos
- Validaciones

### 3. Capa de Infraestructura (Infrastructure Layer)

Proporciona implementaciones concretas:
- Implementaciones de repositorios
- Acceso a bases de datos
- Servicios externos
- Logging
- Autenticación y autorización
- Gestión de tenants

### 4. Capa de Presentación / API (Presentation/API Layer)

Interfaces de usuario y APIs:
- Controladores API
- Middleware
- Componentes de UI
- Gestión de rutas
- Validación de entrada

## Gestión Multi-tenant

### Estrategia de Base de Datos

Utilizamos un enfoque híbrido para la gestión de datos multi-tenant:

1. **Base de datos compartida, esquemas separados**: 
   - Cada tenant (tienda) tiene su propio esquema en la base de datos
   - Los datos específicos de cada tienda se mantienen aislados
   - Facilita la gestión y el respaldo de datos por tienda

2. **Tablas compartidas para datos comunes**:
   - Catálogos de productos TIGO
   - Políticas y procedimientos corporativos
   - Información de comisiones estándar

### Identificación de Tenant

- Cada solicitud incluye un identificador de tenant (tienda)
- El middleware de tenant resuelve y valida el tenant actual
- Se utiliza un contexto de tenant para filtrar datos en tiempo de ejecución

## Gestión de Roles y Permisos

### Roles Principales

1. **Vendedor**:
   - Gestión de clientes
   - Registro de ventas
   - Seguimiento de legalizaciones
   - Acceso a reportes personales

2. **Administrador de Tienda**:
   - Todo lo del vendedor
   - Gestión de vendedores
   - Reportes de la tienda
   - Configuración de metas por vendedor

3. **Gerente Regional**:
   - Acceso a múltiples tiendas
   - Reportes consolidados
   - Configuración de metas por tienda
   - Análisis comparativo entre tiendas

4. **Administrador del Sistema**:
   - Gestión de tiendas (tenants)
   - Configuración global
   - Gestión de usuarios y permisos

### Sistema de Permisos

- Basado en Claims y Políticas
- Permisos granulares por funcionalidad
- Restricciones por tenant (tienda)
- Auditoría de acciones por usuario

## Bounded Contexts (Contextos Delimitados)

Siguiendo los principios de DDD, dividimos el sistema en contextos delimitados:

1. **Gestión de Clientes**:
   - Registro y seguimiento de clientes
   - Historial de interacciones
   - Segmentación de clientes

2. **Ventas y Contratos**:
   - Proceso de venta
   - Gestión de contratos
   - Legalizaciones
   - Comisiones

3. **Reportes y Análisis**:
   - KPIs y métricas
   - Reportes operativos
   - Análisis de rendimiento
   - Proyecciones

4. **Gestión de Tiendas**:
   - Configuración de tiendas
   - Asignación de personal
   - Metas y objetivos

5. **Administración del Sistema**:
   - Gestión de usuarios
   - Configuración global
   - Auditoría y seguridad

## Comunicación entre Contextos

- Uso de eventos de dominio para comunicación asíncrona
- Servicios de aplicación para orquestación
- Anti-corruption layers donde sea necesario

## Consideraciones Técnicas

- **Autenticación**: JWT con claims de tenant y roles
- **API Gateway**: Para enrutamiento y validación de tenant
- **Caché**: Por tenant para mejorar rendimiento
- **Almacenamiento**: Separación de archivos por tenant
- **Logging**: Contextualizado por tenant y usuario
