import { Injectable } from '@angular/core';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private server:ServerService) { }

  getAllProcess(category:string):Promise<any>{
    return new Promise((resolve)=>{
      this.server.getAll(category).subscribe({
        next: (data)=>{
          resolve(data);
        },
        error: (data)=>{
          resolve(data);
        }
      })
    })
  }

  getByIdProcess(category:string, id:number):Promise<any>{
    return new Promise((resolve)=>{
      this.server.getById(category, id).subscribe({
        next: (data)=>{
          resolve(data);
        },
        error: (data)=>{
          resolve(data);
        }
      })
    })
  }

  postProcess(category:string, body:Object):Promise<any>{
    return new Promise((resolve)=>{
      this.server.post(category, body).subscribe({
        next: (data)=>{
          resolve(data);
        },
        error: (data)=>{
          resolve(data);
        }
      })
    })
  }

  putProcess(category:any, id:number, body:Object):Promise<any>{
    return new Promise((resolve)=>{
      this.server.put(category, id, body).subscribe({
        next: (data)=>{
          resolve(data);
        },
        error: (data)=>{
          resolve(data);
        }
      })
    })
  }

  deleteProcess(category:any, id:number):Promise<any>{
    return new Promise((resolve)=>{
      this.server.delete(category, id).subscribe({
        next: (data)=>{
          resolve(data);
        },
        error: (data)=>{
          resolve(data);
        }
      })
    })
  }

}