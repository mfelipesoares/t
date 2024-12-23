AFRAME.registerComponent('navmesh-controller', {
    schema: {
      navmeshClass: { type: 'string', default: 'navmesh' },
      holeClass: { type: 'string', default: 'navmesh-hole' },
    },
  
    init: function () {
      this.navmesh = null;
      this.holes = [];
      this.player = this.el; // The player entity
      this.previousPosition = new THREE.Vector3();
  
      this.updateNavmeshAndHoles();
    },
  
    updateNavmeshAndHoles: function () {
      // Find the navmesh object
      const navmeshEls = document.querySelectorAll(`.${this.data.navmeshClass}`);
      if (navmeshEls.length > 0) {
        this.navmesh = navmeshEls[0].object3D;
      }
  
      // Find all navmesh-hole objects
      const holeEls = document.querySelectorAll(`.${this.data.holeClass}`);
      this.holes = Array.from(holeEls).map(el => el.object3D);
    },
  
    isInsideNavmesh: function (position) {
      if (!this.navmesh) return false;
  
      // Use bounding box to check if inside navmesh
      const boundingBox = new THREE.Box3().setFromObject(this.navmesh);
      return boundingBox.containsPoint(position);
    },
  
    isInsideHole: function (position) {
      for (const hole of this.holes) {
        const holeBoundingBox = new THREE.Box3().setFromObject(hole);
        if (holeBoundingBox.containsPoint(position)) {
          return true;
        }
      }
      return false;
    },
  
    tick: function () {
      const currentPosition = this.player.object3D.position.clone();
  
      // Convert player's position to navmesh's local space for accurate checks
      if (this.navmesh) {
        this.navmesh.worldToLocal(currentPosition);
      }
  
      // Check if the player is within the allowed navmesh and not in a hole
      if (
        this.isInsideNavmesh(this.player.object3D.position) &&
        !this.isInsideHole(this.player.object3D.position)
      ) {
        // Save the current position as valid
        this.previousPosition.copy(this.player.object3D.position);
      } else {
        // Reset to the last valid position
        this.player.object3D.position.copy(this.previousPosition);
        console.log("Invalid position")
        
      }
    }
  });
  