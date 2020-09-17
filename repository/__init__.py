class Repository(object):
 def __init__(self, adapter=None):
   self.client = adapter()

 def find_all(self, selector):
   return self.client.find_all(selector)
 
 def find(self, selector):
   return self.client.find(selector)
 
 def create(self, kudo):
   return self.client.create(kudo)
  
 def update(self, selector, kudo, upsert=False):
   return self.client.update(selector, kudo, upsert)
  
 def delete(self, selector):
   return self.client.delete(selector)