<?= $this->Html->css('pollView') ?>
<?= $participatedOnPoll=false;?>
<!-- CENTRAL JUMBOTRON -->
<div class="jumbotron jumbotron-fluid rounded">
    <div class="container">
      <h1 class="display-4"><?=__("View Poll")?></h1>
      <p class="lead"><i class="material-icons lead-icon">keyboard_arrow_right</i><?= h($poll->title) ?></p>
      
      <p class="lead"><?php
          if($poll->place!=null){
            echo "<i class='material-icons lead-icon'>place</i>";
            echo h($poll->place);
          } else {
            echo "- ".__("Location not specified"." -");
          } 
        ?>
      </p>
      
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text link-icon">
            <i class="material-icons">
              link
            </i>
          </span>
        </div>
        <input type="text" class="form-control poll-link" value="<?=$_SERVER["HTTP_HOST"]?>/polls/view/<?= h($poll->url) ?>" disabled id="copyValue">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" onclick="copy()"><?=__("COPY")?></button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table text-center">
          <thead>
            <tr>
              <th scope="col"><?=__("Gaps")?></th>
              <?php foreach ($users as $user): ?>
                <th scope="col"><?= h($user->name) ?></th>
              <?php endforeach; 
               if($gaps->count()!=0){
              ?>
              <th scope="col" class="font-weight-light"><?=__("Total")?></th>
               <?php } ?>
            </tr>
          </thead>
          <tbody>
          <?php 
            $maxGapCount=0;
            if($gaps->count()!=0){
              foreach ($gaps as $gap):
                $gapCount=0;
              ?>
              
              <tr id="TR<?php echo $gap['gap_id'] ?>">
                <th scope="row"><p><?= h($gap->start_date) ?><p><p><?= h($gap->end_date) ?></p></th>
                
                <?php foreach ($users as $user): 
                  $isAssignated=false;
                  ?>
                  <td>
                      <?php 
                      foreach($assignations as $assignation):
                          if($assignation['user_id']==$user->user_id && $assignation['gap_id']==$gap->gap_id){
                              $isAssignated=true;
                              $gapCount++;
                          }

                          if($assignation['user_id']==$this->request->getSession()->read('Auth.User.user_id')){
                            $participatedOnPoll=true;
                        }
                      endforeach;

                      if($isAssignated){
                      ?>
                          <button type="button" class="btn btn-success btn-sm btn-disabled" disabled>
                      <?php
                      }else{
                      ?>
                          <button type="button" class="btn btn-outline-success btn-sm btn-disabled" disabled>
                      <?php
                      }
                      ?>
                      <i class="material-icons">
                      done
                      </i>
                  </td>
                <?php endforeach; 
                if($gapCount>$maxGapCount) {
                  $maxGapCount=$gapCount;
                }
                ?>
                <td>
                  <a class="font-weight-light" id="count<?php echo $gap['gap_id'] ?>"><?php echo $gapCount?></a>
                </td>
              
              <?php endforeach; 
              } else {?>
                <td><a class="lead"><?= __("Nobody has participated yet. Be the first!")?></a></td>
              <?php  }?>
              </tr>
          </tbody>
        </table>

        <script>
        <?php foreach ($gaps as $gap):?>
          if(document.getElementById("count<?php echo $gap['gap_id'] ?>").innerHTML=="<?php echo $maxGapCount?>"
          &&document.getElementById("count<?php echo $gap['gap_id'] ?>").innerHTML!="0"){
            document.getElementById("TR<?php echo $gap['gap_id'] ?>").classList.add("table-success");
          }
        <?php endforeach; ?>
        </script>

        <hr class="my-3">
        
      </div>
    </div>

    <div class="other-option-button text-center">
      <?php if(!$participatedOnPoll){?>
      <a ><?= $this->Html->link(__('Participate'), ['controller'=>'assignations','action' => 'add', $poll->url],["class"=>"btn btn-outline-info"]) ?></a>
      <?php }else{ ?>
        <a ><?= $this->Html->link(__('Modify participation'), ['controller'=>'assignations','action' => 'edit', $poll->url],["class"=>"btn btn-outline-info"]) ?></a>
      <?php } ?>
      <?php if($this->request->getSession()->read('Auth.User.user_id')==$poll->author){ ?>
        <a ><?= $this->Html->link(__('Edit poll'), ['controller'=>'polls','action' => 'edit', $poll->url],["class"=>"btn btn-outline-info"]) ?></a>
      <?php } ?>
    </div>
</div>