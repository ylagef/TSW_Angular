<?php
namespace App\Controller;

use Cake\Event\Event;
use App\Controller\AppController;
use Cake\I18n\I18n;

/**
 * Polls Controller
 *
 * @property \App\Model\Table\PollsTable $Polls
 *
 * @method \App\Model\Entity\Poll[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class PollsController extends AppController
{
    public function beforeFilter(Event $event)
    {
        I18n::setLocale($this->request->getCookie('lang'));
        parent::beforeFilter($event);
    }

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $this->loadModel('Assignations');
        $this->loadModel('Gaps');
        $user_id=$this->Auth->user('user_id');

        $createdPolls = $this->Polls->find()->where(["author"=>$user_id]);
        $this->set('createdPolls', $createdPolls);

        $gaps=$this->Assignations->find()->where(["user_id"=>$user_id])->select("gap_id");
        $polls=$this->Gaps->find()->where(["gap_id in"=>$gaps])->select("poll_id");
        $participatingPolls=$this->Polls->find()->where(["poll_id in"=>$polls]);
        $this->set('participatingPolls', $participatingPolls);

        $this->set(compact('polls'));
    }

    /**
     * View method
     *
     * @param string|null $id Poll id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($url = null)
    {
         $poll = $this->Polls->find()->where(['url' => $url])->first();
         if($poll==null){
             $this->Flash->error(__('The required poll does not exist.'));
             return $this->redirect(['controller'=>'Polls','action' => 'index']);
         }
        $this->set('poll', $poll);

        $id = $poll->poll_id;
        
        $this->loadModel('Gaps');
            $gaps = $this->Gaps->find()->where(['poll_id' => $id]); // Gaps of poll
        $this->set('gaps', $gaps);

        $this->loadModel('Users');
        $this->loadModel('Assignations');

        $pollGaps1 = $this->Gaps->find()->where(['poll_id' => $id]); //Gaps id of poll
        $assignations1 = $this->Assignations->find()->where(['gap_id in' => $pollGaps1->select('gap_id')]); // Assignated gaps of poll
        $users = $this->Users->find()->where(['user_id in'=>$assignations1->select('user_id')]); // All users (change to just participators)

        $this->set('users', $users->toArray());
    
        $pollGaps = $this->Gaps->find()->where(['poll_id' => $id])->select('gap_id'); //Gaps id of poll
        $assignations = $this->Assignations->find()->where(['gap_id in' => $pollGaps]); // Assignated gaps of poll
        $this->set('assignations', $assignations->toArray());
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $poll = $this->Polls->newEntity();
        if ($this->request->is('post')) {
            $poll = $this->Polls->patchEntity($poll, $this->request->getData());
        
            $poll->url=hash("md5", ($poll->title."hash difficult text"));
           
            if ($this->Polls->save($poll)) {
                $this->Flash->success(__('The poll has been saved.'));

                return $this->redirect(['controller'=>'Gaps','action' => 'add', $poll->url]);
            }
                $this->Flash->error(__('The poll could not be created. Please, try again.'));
        }
        $this->set(compact('poll'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Poll id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($url = null)
    {
        $poll = $this->Polls->find()->where(['url' => $url])->first();
        $this->set('poll', $poll);

        if($poll->author!=$this->Auth->user('user_id')){
            $this->Flash->error("You are not authorized to do this.");
            return $this->redirect(['action' => 'view', $url]);
        }

         $id=$poll->poll_id;

        $this->loadModel('Gaps');
            $gaps = $this->Gaps->find()->where(['poll_id' => $id]); // Gaps of poll
        $this->set('gaps', $gaps);

        $this->loadModel('Users');
        $this->loadModel('Assignations');

        $pollGaps1 = $this->Gaps->find()->where(['poll_id' => $id]); //Gaps id of poll
        $assignations1 = $this->Assignations->find()->where(['gap_id in' => $pollGaps1->select('gap_id')]); // Assignated gaps of poll
        
        $users = $this->Users->find()->where(['user_id in'=>$assignations1->select('user_id')]); // All users (change to just participators)
        
        $this->set('users', $users->toArray());
    
        $pollGaps = $this->Gaps->find()->where(['poll_id' => $id])->select('gap_id'); //Gaps id of poll
        $assignations = $this->Assignations->find()->where(['gap_id in' => $pollGaps]); // Assignated gaps of poll
        $this->set('assignations', $assignations->toArray());

        if ($this->request->is(['patch', 'post', 'put'])) {
            $error="";
            $poll = $this->Polls->patchEntity($poll, $this->request->getData());
            
            $formGaps =  $this->request->getData();
            debug($poll);
            debug($this->request->getData());
            if ($this->Polls->save($poll)) {
                $alreadyOnDb=array();
                $newGaps=array();

                foreach ($formGaps as $gap){
                    if(is_array($gap)){
                        if(array_key_exists("gap_id", $gap)){
                            // Already in db then not deleted
                            $dbGap=$this->Gaps->get($gap["gap_id"]);
                            $alreadyOnDb[]=$dbGap;
                        }else{
                            // New gap always put on db
                            $newGap = $this->Gaps->newEntity();
                            $newGap = $this->Gaps->patchEntity($newGap, $gap);
                            $newGaps[]=$newGap;
                        }
                    }
                }

                foreach($gaps as $g){
                    if(!in_array($g, $alreadyOnDb)){
                        // Delete from db
                        if(!$this->Gaps->delete($g)){
                            $error="The gap could not be saved. Please, try again.";
                            break;  
                        }
                    }
                }

                foreach($newGaps as $g){
                    // Insert all into db
                    if($g->end_date <= $g->start_date){
                        $error=__("End date has to be later than start date.");
                        break;
                    }
                    
                    if (!$this->Gaps->save($g)) {
                        $error="The gap could not be saved. Please, try again.";
                        break;
                    }
                }

                
            }else{
                $error="The poll could not be saved. Please, try again.";
            }

            if($error==""){
                    $this->Flash->success(__('The poll and gaps has been saved.'));
                    return $this->redirect(['action' => 'view', $url]);
            }else{
                    $this->Flash->error($error);
                    $this->set(compact('poll'));
            }
        }

        $this->set(compact('poll'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Poll id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $poll = $this->Polls->get($id);
        if ($this->Polls->delete($poll)) {
            $this->Flash->success(__('The poll has been deleted.'));
        } else {
            $this->Flash->error(__('The poll could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
