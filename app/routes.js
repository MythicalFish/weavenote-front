// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  const childRoutes = [
    {
      path: '/organization',
      name: 'Organization',
      getComponent(nextState, cb) {
        const importModules = Promise.all([import('containers/Organization')]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/projects',
      name: 'ProjectList',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ProjectList/reducer'),
          import('containers/ProjectList/sagas'),
          import('containers/ProjectList'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('ProjectList', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/projects/:id',
      name: 'ProjectManager',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ProjectManager/reducer'),
          import('containers/ProjectManager/sagas'),
          import('containers/ProjectManager'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('Project', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/materials',
      name: 'MaterialList',
      getComponent(nextState, cb) {
        const importModules = Promise.all([import('containers/MaterialList')]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/materials/:id',
      name: 'MaterialManager',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MaterialManager/reducer'),
          import('containers/MaterialManager/subcomponents/Form/reducer'),
          import('containers/MaterialManager/sagas'),
          import('containers/MaterialManager'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, formReducer, sagas, component]) => {
          injectReducer('MaterialManager', reducer.default);
          injectReducer('form', formReducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/profile',
      name: 'profile',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Profile/reducer'),
          import('containers/Profile/sagas'),
          import('containers/Profile'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('profile', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];

  return {
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        // global Sagas
        import('containers/App/sagas'),
        import('containers/Collaborators/sagas'),
        import('containers/Organization/sagas'),
        import('containers/ImageThumbnails/sagas'),
        import('containers/ImageUploader/sagas'),
        import('containers/ImageForm/sagas'),
        import('containers/Comments/sagas'),
        import('containers/MaterialList/sagas'),
        import('containers/App'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([a, b, c, d, e, f, g, h, component]) => {
        injectSagas(a.default);
        injectSagas(b.default);
        injectSagas(c.default);
        injectSagas(d.default);
        injectSagas(e.default);
        injectSagas(f.default);
        injectSagas(g.default);
        injectSagas(h.default);
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
    childRoutes,
  };
}
