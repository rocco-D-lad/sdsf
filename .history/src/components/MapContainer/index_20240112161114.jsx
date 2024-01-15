import React, { useCallback } from 'react';
import Scene from 'tuyang-scene';
import { Platform, Login } from 'tuyang-components';

const sceneCtl = Scene();
const SceneComp = sceneCtl.Dom;

let mapViewer = null;

export const getViewer = () => mapViewer;

function MapScene({
  login = false,
  children,
  onSuccess = () => null,
  onError = () => null,
  ...otherProps
}) {
  const handleSuccess = useCallback((viewerGroup) => {
    mapViewer = Array.isArray(viewerGroup)
      ? viewerGroup[0]?.instance
      : viewerGroup;
    if (onSuccess) {
      onSuccess(mapViewer);

      mapViewer.core.config.isFlyToFloorOnSplitFloorEnd = false
      mapViewer.core.config.isFlyToBuildOnSplitBuildEnd = false
      console.log(mapViewer,'mapViewer');
    }
  }, []);

  return (
    <Platform>
      {
        (config) =>
          (
            <Login
              active={login}
              config={config}
              renderLogin={otherProps.renderLogin}
              render={() => (
                <SceneComp
                  onMapSuccessAll={handleSuccess}
                  onMapError={onError}
                  configs={config}
                  {...otherProps}
                >
                  {children}
                </SceneComp>
              )}
            />
          )
      }
    </Platform>
  );
}

export default MapScene;
