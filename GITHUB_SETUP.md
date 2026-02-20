# Crear el repositorio en GitHub

El proyecto ya está preparado con Git. Para subirlo a GitHub:

## Opción 1: Usando GitHub CLI (recomendado)

### 1. Autenticarse

```bash
gh auth login
```

- Elige **GitHub.com**
- Elige **HTTPS**
- Sigue las instrucciones (navegador o token)

### 2. Crear el repositorio y subir

```bash
./scripts/github-setup.sh
```

O manualmente:

```bash
gh repo create pps-plataforma-estudio --public --source=. --description "Plataforma interactiva de estudio - Puesta y Producción Segura" --push
```

## Opción 2: Crear el repo en la web

1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repositorio: `pps-plataforma-estudio`
3. Descripción: `Plataforma interactiva de estudio - Puesta y Producción Segura`
4. Elige **Public**
5. **No** marques "Add a README" (ya existe)
6. Clic en **Create repository**

### 7. Conectar y subir desde tu máquina

```bash
cd /home/jmpicon/Documentos/Proyectos/pps

git remote add origin https://github.com/TU_USUARIO/pps-plataforma-estudio.git
git push -u origin main
```

Sustituye `TU_USUARIO` por tu nombre de usuario de GitHub.
