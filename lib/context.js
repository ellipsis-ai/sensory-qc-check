/*
@exportId FVhCL8SUSeWItd6qQbYBSA
*/
module.exports = (function() {
class CropResult {
  constructor(obj) {
    this.flavor = obj.flavor;
    this.appearance = obj.appearance;
  }
}

class Context {
  constructor(obj) {
    this.room = obj.room;
    this.harvestDate = obj.harvestDate;
    let cropResults = {};
    Object.keys(obj.cropResults || {}).forEach(k => cropResults[k] = new CropResult(obj.cropResults[k]));
    this.cropResults = cropResults;
    this.cropsTodo = obj.cropsTodo;
  }
  
  resultFor(crop) {
    return this.cropResults[crop] || {};
  }
  
  withNewResult(crop, kind, result) {
    const existingData = this.resultFor(crop) || {};
    const data = Object.assign({}, existingData, {[kind]: result});
    const newCropResults = Object.assign({}, this.cropResults, { [crop]: data });
    return new Context({
      room: this.room,
      harvestDate: this.harvestDate,
      cropResults: newCropResults,
      cropsTodo: this.cropsTodo.filter(ea => ea != crop)
    })
  }
  
  nextCrop() {
    return this.cropsTodo[0];
  }
  
  isDone() {
    return !this.nextCrop();
  }
  
  acceptFlavorResult(crop, result, ellipsis) {
    const newContext = this.withNewResult(crop, "flavor", result)
    ellipsis.success("", {
      next: {
        actionName: "run-appearance-check",
        args: [
          { name: "contextString", value: JSON.stringify(newContext) },
          { name: "crop", value: crop }
        ]
      }
    });
  }
  
  acceptAppearanceResult(crop, result, ellipsis) {
    const newContext = this.withNewResult(crop, "appearance", result);
    const nextCrop = newContext.nextCrop();
    if (nextCrop) {
      ellipsis.success("", {
        next: {
          actionName: "run-check",
          args: [
            { name: "contextString", value: JSON.stringify(newContext) },
            { name: "crop", value: nextCrop }
          ]
        }
      }); 
    } else {
      ellipsis.success("", {
        next: {
          actionName: "post-summary",
          args: [
            { name: "contextString", value: JSON.stringify(newContext) }
          ]
        }
      })
    }
  }
}

return Context;
})()
     